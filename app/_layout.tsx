import { Stack } from 'expo-router';
import { SettingsProvider } from '../context/settings';

export default function RootLayout() {
  return (
    <SettingsProvider>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'none'
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
      </Stack>
    </SettingsProvider>
  );
}