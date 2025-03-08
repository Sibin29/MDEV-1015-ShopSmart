import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LogInPartnerScreen from './src/screens/LogInPartnerScreen';
import SignupPartnerScreen from './src/screens/SignUpPartnerScreen';
import ManagerHomeScreen from './src/screens/ManagerHomeScreen';
import CustomerHomeScreen from './src/screens/CustomerHomeScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './src/firebase/firebase';

// Create Stack Navigator
const Stack = createStackNavigator();

// Root component
export default function App() {
  
  const [user,setUser] = useState<User | null> (null); 

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log("user:",user);
    });
  })

  //{user ? () : ()}  //to use for checking ned to get user tyee first

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ title: 'ShopSmart' }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login to continue' }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Create a new account' }} />
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
