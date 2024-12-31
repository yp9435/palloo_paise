import { StyleSheet, View, Text, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LessonCardProps {
  title: string;
  description: string;
  duration: string;
  progress?: number;
  image: string;
}

function LessonCard({ title, description, duration, progress = 0, image }: LessonCardProps) {
  return (
    <Pressable style={styles.lessonCard}>
      <Image 
        source={{ uri: image }} 
        style={styles.lessonImage}
      />
      <View style={styles.lessonContent}>
        <Text style={styles.lessonTitle}>{title}</Text>
        <Text style={styles.lessonDescription}>{description}</Text>
        <View style={styles.lessonMeta}>
          <View style={styles.durationContainer}>
            <Ionicons name="time-outline" size={16} color="#555cb3" />
            <Text style={styles.duration}>{duration}</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${progress}%` }]} 
              />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function Learn() {
  const categories = [
    { id: 1, title: 'Basics', icon: 'book' },
    { id: 2, title: 'Investing', icon: 'trending-up' },
    { id: 3, title: 'Savings', icon: 'wallet' },
    { id: 4, title: 'Budgeting', icon: 'calculator' },
  ];

  const lessons = [
    {
      title: 'Introduction to Personal Finance',
      description: 'Learn the fundamentals of managing your money effectively',
      duration: '15 min',
      progress: 100,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3',
    },
    {
      title: 'Building an Emergency Fund',
      description: 'Why and how to save for unexpected expenses',
      duration: '10 min',
      progress: 60,
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3',
    },
    {
      title: 'Understanding Credit Scores',
      description: 'Everything you need to know about credit scores',
      duration: '20 min',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Learn</Text>
        <Text style={styles.headerSubtitle}>Master Your Finances</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <Pressable key={category.id} style={styles.categoryCard}>
                <View style={styles.categoryIcon}>
                  <Ionicons name={category.icon as keyof typeof Ionicons.glyphMap} size={24} color="#555cb3" />
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Continue Learning Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          {lessons.map((lesson, index) => (
            <LessonCard key={index} {...lesson} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e3f7',
  },
  header: {
    backgroundColor: '#555cb3',
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    color: '#e2e3f7',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#e2e3f7',
    fontSize: 16,
    marginTop: 5,
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
  categoriesContainer: {
    padding: 20,
  },
  categoryCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    alignItems: 'center',
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    backgroundColor: '#e2e3f7',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  categoryTitle: {
    color: '#555cb3',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555cb3',
    marginBottom: 15,
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonImage: {
    width: '100%',
    height: 150,
  },
  lessonContent: {
    padding: 15,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555cb3',
    marginBottom: 5,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  lessonMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    marginLeft: 5,
    color: '#555cb3',
    fontSize: 14,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    width: 50,
    height: 4,
    backgroundColor: '#e2e3f7',
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f5c116',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#555cb3',
  },
});
