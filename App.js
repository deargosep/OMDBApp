import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ResultScreen from './src/Screens/ResultScreen';
import HomeScreen from './src/Screens/HomeScreen';
import { KeyboardAvoidingView, Platform } from 'react-native';

const Stack = createStackNavigator()
export default function App() {
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding':'height'}
     style={{
      flex:1
    }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </KeyboardAvoidingView>
  )
}