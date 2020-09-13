import React, {useState, useEffect} from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import BottomTabs from './BottomTabs';
import Login from '../screens/Login/index';
import Signup from '../screens/Signup/index';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/Auth';
import Global from '../utils/Global';

export default function Main() {
  const userInfo = useSelector(state => state.entities.auth);
  const dispatch = useDispatch();

  const Stack = createStackNavigator();

  useEffect(() => {
    autoLogin()
  },[])

  const autoLogin = async () => {
    const usernameStorage = await AsyncStorage.getItem('username');
    const passwordStorage = await AsyncStorage.getItem('password');
    if(usernameStorage != '' && passwordStorage != '') {
      try {
        const response = await fetch(`${Global.apiURL}/login?username=${usernameStorage}&password=${passwordStorage}`, {
          headers: {
            "X-Parse-Application-Id": Global.appID,
            Authorization: "application/json"
          },
        })
        const result = await response.json();
        
        if(result.error) {
          console.log(result.error)
        } else {
          dispatch(login({token: result.sessionToken, username: result.username, email: result.email, name: result.name}))
          storeData('token', result.sessionToken);
          storeData('username', result.username);
          storeData('password', password);
        }
      } catch(err) {
        console.log("error", err)
      }
    }
  }

  return (
    <Stack.Navigator>
        {userInfo.token == '' && userInfo.isLogin == false ? (
          <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          </>
        ) : (
          <Stack.Screen name="Main" component={BottomTabs} />
        )}
        
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
