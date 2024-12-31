import * as Font from 'expo-font';

export const useFonts = async () => {
  try {
    console.log('Starting font load...');
    await Font.loadAsync({
      // English
      'NotoSans': require('../assets/fonts/NotoSansEnglish.ttf'),      
      
      // Tamil
      'NotoSansTamil': require('../assets/fonts/NotoSansTamil.ttf'),
      
      // Malayalam
      'NotoSansMalayalam': require('../assets/fonts/NotoSansMalayalam.ttf'),
    
      
      // Devanagari (Hindi)
      'NotoSansDevanagari': require('../assets/fonts/NotoSansDevanagari.ttf'),
      
      // Telugu
      'NotoSansTelugu': require('../assets/fonts/NotoSansTelugu.ttf'),
      
      // Kannada
      'NotoSansKannada': require('../assets/fonts/NotoSansKannada.ttf'),
     
    });
    console.log('All fonts loaded successfully');
  } catch (error) {
    console.error('Detailed font loading error:', error);
    throw error;
  }
}; 