import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingsContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const SettingsContext = createContext<SettingsContextType>({
  language: 'en',
  setLanguage: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    loadSavedSettings();
  }, []);

  const loadSavedSettings = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        console.log('Loaded saved language:', savedLanguage);
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSetLanguage = async (lang: string) => {
    try {
      console.log('Saving language:', lang);
      await AsyncStorage.setItem('language', lang);
      setLanguage(lang);
    } catch (error) {
      console.error('Error saving language setting:', error);
    }
  };

  return (
    <SettingsContext.Provider 
      value={{ 
        language, 
        setLanguage: handleSetLanguage 
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext); 