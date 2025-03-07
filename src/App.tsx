import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import LogInPartnerScreen from './screens/LogInPartnerScreen';
import SignupPartnerScreen from './screens/SignUpPartnerScreen';
import ManagerHomeScreen from './screens/ManagerHomeScreen';
import CustomerHomeScreen from './screens/CustomerHomeScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import InventoryScreen from './screens/InventoryScreen';

// Create Stack Navigator
const Stack = createStackNavigator();

// Root component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ title: 'ShopSmart' }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login to continue' }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ title: 'Create a new account' }} />
        <Stack.Screen name="LogInPartnerScreen" component={LogInPartnerScreen} options={{ title: 'Login as Partner' }} />
        <Stack.Screen name="SignupPartnerScreen" component={SignupPartnerScreen} options={{ title: 'Create a new account as Partner' }} />
        <Stack.Screen name="ManagerHomeScreen" component={ManagerHomeScreen} options={{ title: 'Inventory' }} />
        <Stack.Screen name="CustomerHomeScreen" component={CustomerHomeScreen} options={{ title: 'All Shops' }} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ title: 'My Profile' }} />
        <Stack.Screen name="InventoryScreen" component={InventoryScreen} options={{ title: 'Shop for items' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
