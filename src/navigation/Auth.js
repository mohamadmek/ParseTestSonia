import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login/index';
import Signup from '../screens/Signup/index';

export default function Auth() {
  const Auth = createStackNavigator();
  return (
    <Auth.Navigator>
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="Signup" component={Signup} />
    </Auth.Navigator>  
  )
}

const styles = StyleSheet.create({})
