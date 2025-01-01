import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useSettings } from '../../context/settings';

export default function Settings() {
  const { language, setLanguage } = useSettings();

  const handleLanguageChange = (value: string) => {
    console.log('Changing language to:', value);
    setLanguage(value);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.settingsList} showsVerticalScrollIndicator={false}>
        {/* Language Section First */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="language" size={20} color="#555cb3" />
            {" "}Language
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingDetails}>
              <Text style={styles.settingTitle}>Select Language</Text>
              <Text style={styles.settingDescription}>Choose your preferred language</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={language}
                  onValueChange={handleLanguageChange}
                  style={styles.picker}
                >
                  <Picker.Item label="English" value="en" />
                  <Picker.Item label="हिंदी" value="hi" />
                  <Picker.Item label="தமிழ்" value="ta" />
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  settingsList: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  settingItem: {
    marginBottom: 10,
  },
  settingDetails: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  pickerContainer: {
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
