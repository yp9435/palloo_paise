import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import lessons from '../../assets/data/lessons.json';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '../../context/settings';
import { useEffect } from 'react';

type Language = 'en' | 'hi' | 'ta';

export default function LearnPage() {
  const { language } = useSettings();

  useEffect(() => {
    console.log('Current language in Learn:', language);
  }, [language]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {language === 'hi' ? 'सीखने का केंद्र' : 'Learning Hub'}
        </Text>
        <Text style={styles.headerSubtitle}>
          {language === 'hi' ? 'अपना वित्तीय ज्ञान बढ़ाएं' : 'Build your financial knowledge'}
        </Text>
      </View>

      <Pressable 
        style={styles.schemesCard}
        onPress={() => router.push('/schemes')}
      >
        <View style={styles.schemesContent}>
          <View>
            <Text style={styles.schemesTitle}>
              {language === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes'}
            </Text>
            <Text style={styles.schemesSubtitle}>
              {language === 'hi' ? 'आपके लिए उपलब्ध योजनाएं खोजें' : 'Discover schemes available for you'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#555cb3" />
        </View>
      </Pressable>

      <View style={styles.lessonGrid}>
        {lessons.lessons.map((lesson) => {
          const translation = lesson.translations[language as Language] || lesson.translations.en;
          console.log('Lesson translation:', translation);
          
          return (
            <Pressable 
              key={lesson.contentId}
              style={styles.lessonCard}
              onPress={() => router.push(`/lesson/${lesson.contentId}`)}
            >
              <Image
                source={lesson.mediaUrls[0]}
                style={styles.lessonImage}
                contentFit="cover"
              />
              <View style={styles.lessonContent}>
                <Text style={styles.lessonTitle}>
                  {translation.title}
                </Text>
                <View style={styles.lessonMeta}>
                  <View style={styles.difficultyBadge}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.difficultyText}>
                      Level {lesson.difficulty}
                    </Text>
                  </View>
                  <View style={styles.tagContainer}>
                    {lesson.tags.slice(0, 2).map((tag, index) => (
                      <Text key={index} style={styles.tag}>
                        {tag}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#555cb3',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e2e3f7',
    marginTop: 4,
  },
  lessonGrid: {
    padding: 15,
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lessonImage: {
    width: '100%',
    height: 160,
  },
  lessonContent: {
    padding: 15,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  lessonMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#666',
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tag: {
    fontSize: 12,
    color: '#555cb3',
    backgroundColor: '#e2e3f7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  schemesCard: {
    backgroundColor: 'white',
    margin: 15,
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(85, 92, 179, 0.1)',
  },
  schemesContent: {
    padding: 24,
    paddingVertical: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(85, 92, 179, 0.03)',
  },
  schemesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555cb3',
    marginBottom: 4,
  },
  schemesSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});
