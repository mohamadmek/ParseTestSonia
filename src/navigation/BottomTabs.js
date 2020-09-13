import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/index';
import UserDetails from '../screens/UserDetails/index';
import Icon from 'react-native-vector-icons/FontAwesome';

 const BottomTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="UserDetails" component={UserDetails} />
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})

export default BottomTabs;