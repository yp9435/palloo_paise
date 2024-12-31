import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { router } from 'expo-router';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to main screen after animation
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY }],
          alignItems: 'center',
        }}
      >
        <Image 
          source={require('../assets/images/palloologo.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Palloo Paise</Text>
        <Text style={styles.subtitle}>Your Financial Journey</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e3f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#555cb3',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#555cb3',
    marginTop: 10,
    textAlign: 'center',
  },
});
