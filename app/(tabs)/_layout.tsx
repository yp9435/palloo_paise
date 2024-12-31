import { View, Pressable } from 'react-native';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#e2e3f7',
          tabBarInactiveTintColor: '#e2e3f7',
          headerStyle: {
            backgroundColor: '#555cb3',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
            color: '#e2e3f7',
          },
          headerShadowVisible: false,
          headerTintColor: '#e2e3f7',
          tabBarStyle: {
            backgroundColor: '#555cb3',
            borderTopWidth: 0,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            height: 65,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 4,
          },
          tabBarItemStyle: {
            paddingVertical: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <Ionicons 
                name={focused ? 'home-sharp' : 'home-outline'} 
                color={focused ? '#f5c116' : '#e2e3f7'}
                size={focused ? 28 : 24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="learn"
          options={{
            title: 'Learn',
            tabBarIcon: ({ focused }) => (
              <Ionicons 
                name={focused ? 'book' : 'book-outline'} 
                color={focused ? '#f5c116' : '#e2e3f7'}
                size={focused ? 28 : 24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="voice"
          options={{
            title: '',
            tabBarIcon: () => (
              <View style={{
                width: 60,
                height: 60,
                backgroundColor: '#f5c116',
                borderRadius: 30,
                marginBottom: 20,
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
              }}>
                <Ionicons name="mic" size={32} color="#555cb3" />
              </View>
            ),
            tabBarButton: (props) => (
              <Pressable
                {...props}
                onPress={() => {
                  // Handle mic button press
                  console.log('Mic pressed');
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="budget"
          options={{
            title: 'Budget',
            tabBarIcon: ({ focused }) => (
              <Ionicons 
                name={focused ? 'wallet' : 'wallet-outline'} 
                color={focused ? '#f5c116' : '#e2e3f7'}
                size={focused ? 28 : 24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ focused }) => (
              <Ionicons 
                name={focused ? 'settings' : 'settings-outline'} 
                color={focused ? '#f5c116' : '#e2e3f7'}
                size={focused ? 28 : 24}
              />
            ),
          }}
        />
      </Tabs>
    );
  }