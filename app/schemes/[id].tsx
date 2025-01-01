import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import schemes from '../../assets/data/schemes.json';
import { useSettings } from '../../context/settings';

type Language = 'en' | 'hi' | 'ta';

export default function SchemeDetailPage() {
  const { id } = useLocalSearchParams();
  const { language } = useSettings();
  const scheme = schemes.schemes.find(s => s.schemeId === id);

  if (!scheme) {
    return (
      <View style={styles.errorContainer}>
        <Text>Scheme not found</Text>
      </View>
    );
  }

  const translation = scheme.translations[language as Language] || scheme.translations.en;

  return (
    <ScrollView style={styles.container}>
      <Pressable 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.title}>{translation.title}</Text>
        <Text style={styles.description}>{translation.details.description}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          {translation.details.benefits.map((benefit, index) => (
            <View key={index} style={styles.bulletPoint}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.bulletText}>{benefit}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eligibility</Text>
          {translation.details.eligibility.map((item, index) => (
            <View key={index} style={styles.bulletPoint}>
              <Ionicons name="person" size={20} color="#555cb3" />
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Apply</Text>
          {translation.details.howToApply.map((step, index) => (
            <View key={index} style={styles.bulletPoint}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
              <Text style={styles.bulletText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={styles.contactSection}>
          <Pressable 
            style={styles.contactButton}
            onPress={() => Linking.openURL(scheme.links.official)}
          >
            <Ionicons name="globe" size={20} color="#555cb3" />
            <Text style={styles.contactButtonText}>Official Website</Text>
          </Pressable>

          <Pressable 
            style={styles.contactButton}
            onPress={() => Linking.openURL(`tel:${scheme.links.helpline}`)}
          >
            <Ionicons name="call" size={20} color="#555cb3" />
            <Text style={styles.contactButtonText}>Helpline</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fe',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    backgroundColor: '#555cb3',
    borderRadius: 25,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: 24,
    paddingTop: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#555cb3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#555cb3',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e3f7',
    paddingBottom: 10,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bulletText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  stepNumber: {
    width: 24,
    height: 24,
    backgroundColor: '#555cb3',
    borderRadius: 12,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
  },
  contactSection: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#555cb3',
    padding: 18,
    borderRadius: 12,
    justifyContent: 'center',
  },
  contactButtonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
}); 