import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/Auth';

export default function UserDetails() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.entities.auth);
  return (
    <View style={{paddingHorizontal: 10}}>
      <Text style={styles.text}>Name :{userInfo.name}</Text>
      <Text style={styles.text}>User Name: {userInfo.username}</Text>
      <Text style={styles.text}>Email: {userInfo.email}</Text>
      <View style={{alignItems: 'center'}}>
        <TouchableWithoutFeedback onPress={() => dispatch(logout())}>
          <View style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>
              Logout
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 10
  },
  logoutButton: {
    backgroundColor: 'black',
    padding: 5,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    height: 40,
    justifyContent: 'center'
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '700'
  }
})
