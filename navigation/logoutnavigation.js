import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';
import Signup from '../screens/signup';
import ForgotPassword from '../screens/forgotpassword';

const Stack = createStackNavigator();

export default function LogoutNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Login"}>
        <Stack.Screen name="Login" component={Login} options={({ route }) => ({headerShown:false})}/>
        <Stack.Screen name="Signup" component={Signup} options={({ route }) => ({headerShown:false})}/>
        <Stack.Screen name="Forgot" component={ForgotPassword} options={({ route }) => ({headerShown:false})}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}