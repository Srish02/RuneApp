import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';

import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import MainScreen from '../screens/MainScreen';

import NurseDashboardScreen from '../screens/NurseDashboardScreen';
import NurseEditDetails from '../screens/NurseEditDetailsScreen';
import NurseLoginScreen from '../screens/NurseLoginScreen';
import PatientDashboardScreen from '../screens/PatientDashboardScreen';
import PatientLoginOrSignupScreen from '../screens/PatientLoginOrSignUpScreen';
import PatientLoginScreen from '../screens/PatientLoginScreen';
import PatientSignUpScreen from '../screens/PatientSignUpScreen';
import PatientTestResults from '../screens/PatientTestResultsScreen';
import SplashScreen from '../screens/SplashScreen';

import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreen} />
      {/* <Stack.Screen name="Home" component={TabOneScreen} />
      <Stack.Screen name="Page1" component={TabTwoScreen} />
      <Stack.Screen name="PatientList" component={PatientListScreen} />
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash"> */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="PatientLoginOrSignup" component={PatientLoginOrSignupScreen} />
      <Stack.Screen name="PatientLogin" component={PatientLoginScreen} />
      <Stack.Screen name="PatientSignUp" component={PatientSignUpScreen} />
      <Stack.Screen name="PatientDashboard" component={PatientDashboardScreen} />
      <Stack.Screen name="PatientTestResults" component={PatientTestResults} />
      <Stack.Screen name="NurseLogin" component={NurseLoginScreen} />
      <Stack.Screen name="NurseDashboard" component={NurseDashboardScreen} />
      <Stack.Screen name="NurseEditDetails" component={NurseEditDetails} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
