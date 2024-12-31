import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import { useFonts } from '../hooks/useFonts';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await useFonts();
        setFontsLoaded(true);
        // Force navigation to splash screen
        router.replace('/splash');
      } catch (e) {
        console.error('Font loading error:', e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        animation: 'none'
      }}
    >
      <Stack.Screen 
        name="splash" 
        options={{
          gestureEnabled: false
        }}
      />
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false,
          gestureEnabled: false 
        }} 
      />
    </Stack>
  );
}