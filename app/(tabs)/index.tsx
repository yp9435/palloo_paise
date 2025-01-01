import { StyleSheet, View, Text, ScrollView, Pressable, Image } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

//change pannitan aaaaahhhhhhhhhh
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
  const userName = "User"; // This should come from your user state/context

  const mainFeatures = [
    {
      title: 'Learn',
      description: 'Access educational content library',
      icon: 'book' as keyof typeof Ionicons.glyphMap,
      route: '/learn',
      color: '#4CAF50'
    },
    {
      title: 'Track Expenses',
      description: 'Manage your daily expenses',
      icon: 'wallet' as keyof typeof Ionicons.glyphMap,
      route: '/budget',
      color: '#2196F3'
    },
    {
      title: 'Reports',
      description: 'View financial insights',
      icon: 'bar-chart' as keyof typeof Ionicons.glyphMap,
      route: '/report',
      color: '#9C27B0'
    },
    {
      title: 'Govt. Schemes',
      description: 'Access government benefits',
      icon: 'government' as keyof typeof Ionicons.glyphMap,
      route: '/schemes',
      color: '#FF9800'
    },
  ];

  const quickActions = [
    {
      title: 'Voice Commands',
      icon: 'mic' as keyof typeof Ionicons.glyphMap,
      route: '/voice',
      color: '#E91E63'
    },
    {
      title: 'Accessibility',
      icon: 'accessibility' as keyof typeof Ionicons.glyphMap,
      route: '/settings/accessibility',
      color: '#009688'
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Greeting Section */}
      <View style={styles.greetingSection}>
        <Text style={styles.appTitle}>Palloo Paise</Text>
        <View style={styles.titleDivider} />
        <Text style={styles.greeting}>Welcome, {userName}!</Text>
      </View>

      {/* Main Features Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresGrid}>
          {mainFeatures.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action, index) => (
            <Link key={index} href={action.route} asChild>
              <Pressable style={styles.quickActionButton}>
                <Ionicons name={action.icon} size={24} color={action.color} />
                <Text style={styles.quickActionText}>{action.title}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>

      {/* About Section */}
      <View style={styles.aboutSection}>
        <View style={styles.headerRow}>
          <Text style={styles.whyTitle}>Why Palloo Paise?</Text>
          <Image 
            source={require('../../assets/images/palloologo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.whyContainer}>
          <View style={styles.whyCard}>
            <Ionicons name="heart-outline" size={24} color="#555cb3" style={styles.whyIcon} />
            <Text style={styles.whyHeading}>Cultural Connection</Text>
            <Text style={styles.whyText}>
              Inspired by rural Indian women who traditionally keep valuables in their saree's palloo
            </Text>
          </View>

          <View style={styles.whyCard}>
            <Ionicons name="people-outline" size={24} color="#555cb3" style={styles.whyIcon} />
            <Text style={styles.whyHeading}>Community Focus</Text>
            <Text style={styles.whyText}>
              Designed to resonate with and empower women in their daily financial journey
            </Text>
          </View>
        </View>

        <View style={styles.creatorsSection}>
          <Text style={styles.creatorsTitle}>Created by</Text>
          <View style={styles.creatorLinks}>
            <Link href="https://www.linkedin.com/in/yeshaswiprakash/" style={styles.creatorLink}>
              <Text style={styles.creatorName}>Yeshaswi</Text>
              <Ionicons name="open-outline" size={16} color="#555cb3" />
            </Link>
            <Text style={styles.creatorSeparator}>&</Text>
            <Link href="https://www.linkedin.com/in/imgaya3/" style={styles.creatorLink}>
              <Text style={styles.creatorName}>Gayathri</Text>
              <Ionicons name="open-outline" size={16} color="#555cb3" />
            </Link>
          </View>
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
  greetingSection: {
    backgroundColor: '#555cb3',
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  greetingSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555cb3',
    marginBottom: 15,
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
  creatorsSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  creatorsTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  creatorLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  creatorLink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  creatorName: {
    fontSize: 14,
    color: '#555cb3',
    fontWeight: '500',
    marginRight: 4,
  },
  creatorSeparator: {
    marginHorizontal: 8,
    color: '#666',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  quickActionButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#555cb3',
    fontWeight: '500',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  whyContainer: {
    gap: 15,
  },
  whyCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#555cb3',
  },
  whyIcon: {
    marginBottom: 10,
  },
  whyHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555cb3',
    marginBottom: 8,
  },
  logo: {
    width: 80,
    height: 80,
  },
  whyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  appTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#f5c116',  // Golden color
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  titleDivider: {
    height: 2,
    width: 100,
    backgroundColor: '#f5c116',
    marginBottom: 15,
    opacity: 0.7,
  },
});
