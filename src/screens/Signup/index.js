import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native'
import { login } from '../../store/Auth';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

export default function Signup({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
  }
  const signup = async () => {
    if(username.trim() == '' || email.trim() == '' || password.trim() == '' || repassword.trim() == '' || name.trim() == ''){
      alert("All fields are required");
    } else if (password != repassword) {
      alert("Passwords does not match");
    } else {
      try {
        const response = await fetch(`${Global.apiURL}/users`, {
          method: 'POST',
          headers: {
            "X-Parse-Application-Id": Global.appID,
            Authorization: "application/json",
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username,
            name: name,
            email: email,
            password: password
          })
        })
        const result = await response.json();
        if(result.error) {
          alert(result.error)
        } else {
          dispatch(login({username: username, token: result.sessionToken, name: name, email: email}))
          storeData('token', result.sessionToken);
          storeData('username', username);
          storeData('password', password);
          setUsername('');
          setEmail('');
          setPassword('');
          setRepassword('');
          setName('');
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
            placeholder="Name" 
            value={name} 
            onChangeText={text => setName(text)} 
            style={styles.inputs} />
            <TextInput
            placeholder="Username" 
            value={username} 
            onChangeText={text => setUsername(text)} 
            style={styles.inputs} />
            <TextInput 
            placeholder="Email" 
            value={email} 
            onChangeText={text => setEmail(text)} 
            style={styles.inputs} />
            <TextInput 
            placeholder="Password" 
            secureTextEntry 
            value={password} 
            onChangeText={text => setPassword(text)} 
            style={styles.inputs} />
            <TextInput 
            placeholder="Repassword" 
            secureTextEntry 
            value={repassword} 
            onChangeText={text => setRepassword(text)} 
            style={styles.inputs} />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableWithoutFeedback onPress={() => signup()}>
            <View style={styles.loginButton}>
              <Text style={styles.buttonLoginText}>Signup</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
          <View style={styles.signupContainer}>
            <Text style={styles.signuptext}>Login</Text>
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
