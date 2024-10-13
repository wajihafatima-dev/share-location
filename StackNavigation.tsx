import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ViewLocation from './screens/ViewLocation';
import MapScreen from './screens/MapScreen';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="ViewLocation" component={ViewLocation} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
