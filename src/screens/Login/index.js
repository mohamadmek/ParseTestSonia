import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, SafeAreaView, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Global from '../../utils/Global';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import store from '../../App';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/Auth';

export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if(username.trim() == '' || password.trim() == ''){ 
      alert("All fields are required");
    } else {
      try {
        const response = await fetch(`${Global.apiURL}/login?username=${username}&password=${password}`, {
          headers: {
            "X-Parse-Application-Id": Global.appID,
            Authorization: "application/json"
          },
        })
        const result = await response.json();
        
        if(result.error) {
          alert(result.error)
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
    <SafeAreaView>
      <ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username" 
            value={username} 
            onChangeText={text => setUsername(text)} 
            style={styles.inputs} />
          <TextInput 
            placeholder="Password" 
            secureTextEntry 
            value={password} 
            onChangeText={text => setPassword(text)} 
            style={styles.inputs} />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableWithoutFeedback onPress={() => handleLogin()}>
            <View style={styles.loginButton}>
              <Text style={styles.buttonLoginText}>Login</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Signup')}>
          <View style={styles.signupContainer}>
            <Text style={styles.signuptext}>Signup</Text>
          </View>
        </TouchableWithoutFeedback>
       
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center'
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 40,
    width: Dimensions.get('window').width - 40,
    marginVertical: 10,
    paddingLeft: 10
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    height: 50,
    width: Dimensions.get('window').width - 40,
    justifyContent: 'center'
  },
  buttonLoginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  },
  signupContainer: {
    alignItems: 'flex-start',
    paddingLeft: 20
  },
  signuptext: {
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 20,
    marginTop: 15
  }
})

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }


  }
