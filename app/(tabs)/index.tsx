import { StyleSheet, View, Text, ScrollView, Pressable, Image } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  color: string;
}

function FeatureCard({ title, description, icon, route, color }: FeatureCardProps) {
  return (
    <Link href={route} asChild>
      <Pressable style={styles.featureCard}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </Pressable>
    </Link>
  );
}

export default function Index() {
  const features = [
    {
      title: 'Learn',
      description: 'Master financial concepts through interactive lessons',
      icon: 'book',
      route: '/learn',
      color: '#4CAF50'
    },
    {
      title: 'Budget',
      description: 'Track your expenses and manage your money',
      icon: 'wallet',
      route: '/budget',
      color: '#2196F3'
    },
    {
      title: 'Voice Control',
      description: 'Navigate the app using voice commands',
      icon: 'mic',
      route: '/voice',
      color: '#9C27B0'
    },
    {
      title: 'Settings',
      description: 'Customize your app experience',
      icon: 'settings',
      route: '/settings',
      color: '#FF9800'
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Palloo Paise</Text>
        <Text style={styles.heroSubtitle}>Your Financial Journey Starts Here</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1M+</Text>
            <Text style={styles.statLabel}>Users</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>

      {/* Features Grid */}
      <View style={styles.featuresGrid}>
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </View>

      {/* About Us Section */}
      <View style={[styles.aboutSection, { paddingVertical: 30 }]}>
        <Text style={[styles.whyTitle, { textAlign: 'center', marginBottom: 20 }]}>Why Palloo Paise?</Text>
        
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/palloologo.png')}
            style={[styles.logo, { width: 150, height: 150 }]}
            resizeMode="contain"
          />
        </View>

        <View style={[styles.whySection, { marginTop: 20 }]}>
          <Text style={styles.whyText}>
            Rural women in India often keep their valuables tucked in the palloo of their 
            saree or in their blouse. The name reflects the cultural significance and aims 
            to resonate with the daily lives of these women.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e3f7',
  },
  heroSection: {
    backgroundColor: '#555cb3',
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#e2e3f7',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#e2e3f7',
    opacity: 0.9,
    marginBottom: 30,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f5c116',
  },
  statLabel: {
    fontSize: 14,
    color: '#e2e3f7',
    opacity: 0.8,
  },
  statDivider: {
    height: 30,
    width: 1,
    backgroundColor: '#e2e3f7',
    opacity: 0.2,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555cb3',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  aboutSection: {
    padding: 20,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555cb3',
    marginBottom: 15,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  missionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  missionItem: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555cb3',
    marginVertical: 10,
  },
  missionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  whySection: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  whyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555cb3',
    marginBottom: 10,
  },
  whyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    fontStyle: 'italic',
  },
});
