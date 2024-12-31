import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import { router } from 'expo-router';

export default function VoiceNavigation() {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [feedback, setFeedback] = useState('Press and hold to speak');

  // Initialize voice recognition
  useEffect(() => {
    const setupVoice = async () => {
      // Event handlers for voice recognition
      Voice.onSpeechStart = () => setIsListening(true);
      Voice.onSpeechEnd = () => setIsListening(false);
      Voice.onSpeechResults = (e: SpeechResultsEvent) => {
        if (e.value) {
          setSpokenText(e.value[0]);
          handleVoiceCommand(e.value[0]);
        }
      };
    };

    setupVoice();
    return () => {
      // Cleanup
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      setFeedback('Listening...');
    } catch (e) {
      console.error(e);
      setFeedback('Error starting voice recognition');
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setFeedback('Processing...');
    } catch (e) {
      console.error(e);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Define navigation commands and their corresponding actions
    const navigationCommands = {
      'go to home': () => router.push('/'),
      'go home': () => router.push('/'),
      'open home': () => router.push('/'),
      'go to budget': () => router.push('/budget'),
      'open budget': () => router.push('/budget'),
      'show budget': () => router.push('/budget'),
      'go to settings': () => router.push('/settings'),
      'open settings': () => router.push('/settings'),
      'show settings': () => router.push('/settings'),
      'go to learn': () => router.push('/learn'),
      'open learn': () => router.push('/learn'),
      'show learn': () => router.push('/learn'),
    };

    // Check if the command matches any of our navigation commands
    for (const [key, action] of Object.entries(navigationCommands)) {
      if (lowerCommand.includes(key)) {
        action();
        setFeedback(`Navigating to ${key.replace('go to ', '')}`);
        // Provide voice feedback
        Speech.speak(`Navigating to ${key.replace('go to ', '')}`);
        return;
      }
    }

    // If no matching command is found
    setFeedback("Command not recognized. Please try again.");
    Speech.speak("I didn't understand that command. Please try again.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackText}>{feedback}</Text>
        {spokenText ? (
          <Text style={styles.spokenText}>"{spokenText}"</Text>
        ) : null}
      </View>

      <Pressable
        style={[styles.micButton, isListening && styles.micButtonActive]}
        onPressIn={startListening}
        onPressOut={stopListening}
      >
        {isListening ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Ionicons name="mic" size={32} color="#fff" />
        )}
      </Pressable>

      <View style={styles.helpContainer}>
        <Text style={styles.helpTitle}>Voice Commands</Text>
        <Text style={styles.helpText}>Try saying:</Text>
        <Text style={styles.commandExample}>"Go to Home"</Text>
        <Text style={styles.commandExample}>"Open Budget"</Text>
        <Text style={styles.commandExample}>"Show Settings"</Text>
        <Text style={styles.commandExample}>"Go to Learn"</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e3f7',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  feedbackContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  feedbackText: {
    fontSize: 18,
    color: '#555cb3',
    marginBottom: 10,
  },
  spokenText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  micButton: {
    backgroundColor: '#555cb3',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  micButtonActive: {
    backgroundColor: '#f5c116',
  },
  helpContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    marginBottom: 20,
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555cb3',
    marginBottom: 10,
  },
  helpText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  commandExample: {
    fontSize: 16,
    color: '#555cb3',
    marginLeft: 10,
    marginVertical: 5,
  },
});
