import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import GiftScreen from './GiftScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import StartSc from './screens/StartSc';
import BotSpeach from './screens/BotSpeach';
import MainStage from './screens/MainStage'
import Input1 from './screens/Input1';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="StartSc">
          <Stack.Screen
            name="GiftScreen"
            component={GiftScreen}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="StartSc"
            component={StartSc}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="BotSpeach"
            component={BotSpeach}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="MainStage"
            component={MainStage}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Input1"
            component={Input1}
            options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style='auto'/>
    </View>
  )
}

export default App