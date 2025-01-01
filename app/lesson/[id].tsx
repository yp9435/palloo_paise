import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import lessons from '../../assets/data/lessons.json';

export default function LessonPage() {
  const { id } = useLocalSearchParams();
  const lesson = lessons.lessons.find(l => l.contentId === id);

  if (!lesson) {
    return (
      <View style={styles.errorContainer}>
        <Text>Lesson not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Pressable 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#555cb3" />
      </Pressable>

      <Image
        source={lesson.mediaUrls[0]}
        style={styles.heroImage}
        contentFit="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{lesson.translations.en.title}</Text>
        
        <View style={styles.metaInfo}>
          <View style={styles.difficultyBadge}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.difficultyText}>Level {lesson.difficulty}</Text>
          </View>
          
          <View style={styles.tags}>
            {lesson.tags.map((tag, index) => (
              <Text key={index} style={styles.tag}>{tag}</Text>
            ))}
          </View>
        </View>

        <Text style={styles.lessonText}>
          {lesson.translations.en.text}
        </Text>

        {/* Audio Player Component - You'll need to implement this */}
        <Pressable style={styles.audioPlayer}>
          <Ionicons name="play-circle" size={32} color="#555cb3" />
          <Text style={styles.audioText}>Listen to Lesson</Text>
        </Pressable>

        {lesson.mediaUrls.length > 1 && (
          <View style={styles.additionalMedia}>
            <Text style={styles.sectionTitle}>Additional Resources</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {lesson.mediaUrls.slice(1).map((url, index) => (
                <Image
                  key={index}
                  source={url}
                  style={styles.thumbnailImage}
                  contentFit="cover"
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
  },
  heroImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  metaInfo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
  },
  difficultyText: {
    marginLeft: 5,
    color: '#666',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e2e3f7',
    color: '#555cb3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  lessonText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  audioPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  audioText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555cb3',
  },
  additionalMedia: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  thumbnailImage: {
    width: 120,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
  },
}); 