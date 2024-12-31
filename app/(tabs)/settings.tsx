import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const settingsOptions = [
    { title: 'Account', icon: 'person', color: '#4CAF50' },
    { title: 'Notifications', icon: 'notifications', color: '#FF9800' },
    { title: 'Categories', icon: 'list', color: '#2196F3' },
    { title: 'Security', icon: 'shield', color: '#9C27B0' },
    { title: 'Appearance', icon: 'color-palette', color: '#F44336' },
    { title: 'Help & Support', icon: 'help-circle', color: '#607D8B' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.settingsList}>
        {settingsOptions.map((option, index) => (
          <Pressable 
            key={index}
            style={styles.settingItem}
            onPress={() => {/* Handle navigation */}}
          >
            <View style={[styles.iconContainer, { backgroundColor: option.color + '20' }]}>
              <Ionicons name={option.icon as keyof typeof Ionicons.glyphMap} size={24} color={option.color} />
            </View>
            <View style={styles.settingDetails}>
              <Text style={styles.settingTitle}>{option.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#555cb3" />
          </Pressable>
        ))}
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
  settingsList: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  settingDetails: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555cb3',
  },
});
