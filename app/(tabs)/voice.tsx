import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, ActivityIndicator, Vibration } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import { router } from 'expo-router';

export default function VoiceNavigation() {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [feedback, setFeedback] = useState('Press and hold to speak');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const setupVoice = async () => {
      try {
        await Voice.isAvailable();
        
        Voice.onSpeechStart = () => {
          setIsListening(true);
          Vibration.vibrate(50); // Short vibration feedback
        };
        
        Voice.onSpeechEnd = () => {
          setIsListening(false);
          setIsProcessing(true);
          Vibration.vibrate(50);
        };
        
        Voice.onSpeechResults = (e: SpeechResultsEvent) => {
          if (e.value) {
            setSpokenText(e.value[0]);
            handleVoiceCommand(e.value[0]);
          }
          setIsProcessing(false);
        };

        Voice.onSpeechError = (e) => {
          console.error('Speech recognition error:', e);
          setIsListening(false);
          setIsProcessing(false);
          setFeedback('Error recognizing speech. Please try again.');
          Vibration.vibrate([100, 200, 100]); // Error vibration pattern
        };
      } catch (e) {
        console.error('Failed to initialize voice recognition:', e);
      }
    };

    setupVoice();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      setSpokenText('');
      await Voice.start('en-US');
      setFeedback('Listening...');
    } catch (e) {
      console.error('Error starting voice recognition:', e);
      setFeedback('Error starting voice recognition');
      Vibration.vibrate([100, 200, 100]);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setFeedback('Processing...');
    } catch (e) {
      console.error('Error stopping voice recognition:', e);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Enhanced navigation commands with more variations
    const navigationCommands = {
      'home': [
        'go to home', 'go home', 'open home', 'take me home',
        'navigate to home', 'show home', 'home page'
      ],
      'budget': [
        'go to budget', 'open budget', 'show budget',
        'navigate to budget', 'budget page', 'check budget'
      ],
      'settings': [
        'go to settings', 'open settings', 'show settings',
        'navigate to settings', 'settings page', 'preferences'
      ],
      'learn': [
        'go to learn', 'open learn', 'show learn',
        'navigate to learn', 'learning page', 'lessons'
      ],
      'schemes': [
        'go to schemes', 'open schemes', 'show schemes',
        'government schemes', 'check schemes', 'available schemes'
      ]
    };

    // Find matching command
    for (const [route, commands] of Object.entries(navigationCommands)) {
      if (commands.some(cmd => lowerCommand.includes(cmd))) {
        // Provide haptic feedback
        Vibration.vibrate(100);
        
        // Navigate and provide feedback
        router.push(`/${route === 'home' ? '' : route}`);
        const destination = route.charAt(0).toUpperCase() + route.slice(1);
        setFeedback(`Navigating to ${destination}`);
        Speech.speak(`Navigating to ${destination}`);
        return;
      }
    }

    // No matching command found
    setFeedback("Command not recognized. Please try again.");
    Speech.speak("I didn't understand that command. Please try again.");
    Vibration.vibrate([50, 100, 50]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackText}>{feedback}</Text>
        {spokenText ? (
          <Text style={styles.spokenText}>"{spokenText}"</Text>
        ) : null}
        {isProcessing && (
          <ActivityIndicator style={styles.processingIndicator} color="#555cb3" />
        )}
      </View>

      <Pressable
        style={[
          styles.micButton,
          isListening && styles.micButtonActive,
          isProcessing && styles.micButtonProcessing
        ]}
        onPressIn={startListening}
        onPressOut={stopListening}
      >
        {isListening ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Ionicons 
            name={isProcessing ? "hourglass" : "mic"} 
            size={32} 
            color="#fff" 
          />
        )}
      </Pressable>

      <View style={styles.helpContainer}>
        <Text style={styles.helpTitle}>Voice Commands</Text>
        <Text style={styles.helpText}>Try saying:</Text>
        <Text style={styles.commandExample}>"Go to Home"</Text>
        <Text style={styles.commandExample}>"Open Budget"</Text>
        <Text style={styles.commandExample}>"Show Settings"</Text>
        <Text style={styles.commandExample}>"Go to Learn"</Text>
        <Text style={styles.commandExample}>"Check Schemes"</Text>
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
  micButtonProcessing: {
    backgroundColor: '#ffd700',
  },
  processingIndicator: {
    marginTop: 10,
  },
});
