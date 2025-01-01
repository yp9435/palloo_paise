import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import schemes from '../../assets/data/schemes.json';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '../../context/settings';

type Language = 'en' | 'hi' | 'ta';

export default function SchemesPage() {
  const { language } = useSettings();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Government Schemes</Text>
        <Text style={styles.headerSubtitle}>Financial support programs for you</Text>
      </View>

      <View style={styles.schemeGrid}>
        {schemes.schemes.map((scheme) => {
          const translation = scheme.translations[language as Language] || scheme.translations.en;
          
          return (
            <Pressable 
              key={scheme.schemeId}
              style={styles.schemeCard}
              onPress={() => router.push(`/schemes/${scheme.schemeId}`)}
            >
              <View style={styles.cardContent}>
                <View style={styles.titleContainer}>
                  <Text style={styles.schemeTitle}>{translation.title}</Text>
                  <Text style={styles.schemeDescription}>
                    {translation.shortDescription}
                  </Text>
                </View>

                <View style={styles.tagContainer}>
                  {scheme.targetGroup.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.categoryContainer}>
                  {scheme.category.map((cat, index) => (
                    <View key={index} style={styles.category}>
                      <Ionicons 
                        name={getCategoryIcon(cat)} 
                        size={16} 
                        color="#555cb3" 
                      />
                      <Text style={styles.categoryText}>{cat}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

// Helper function to get icons for categories
function getCategoryIcon(category: string): keyof typeof Ionicons.glyphMap {
  const icons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
    banking: 'wallet',
    insurance: 'shield-checkmark',
    business: 'briefcase',
    loans: 'cash',
    household: 'home',
    health: 'medical',
    savings: 'save',
    education: 'school'
  };
  return icons[category] || 'information-circle' as keyof typeof Ionicons.glyphMap;
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
  schemeGrid: {
    padding: 15,
  },
  schemeCard: {
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
  cardContent: {
    padding: 15,
  },
  titleContainer: {
    marginBottom: 10,
  },
  schemeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  schemeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#e2e3f7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#555cb3',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#555cb3',
    marginLeft: 4,
  },
});
