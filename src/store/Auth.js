import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}

const initialState = {
  token: '',
  name: '',
  username: '',
  isLogin: false,
  email: ''
} 

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login : (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isLogin = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    logout : (state, action) => {
      state.token = '';
      state.username = '';
      state.isLogin = false;
      state.email = '';
      state.name = '';
      storeData('token', '');
      storeData('username', '');
      storeData('password', '');
    }
  }
})

export const { login, logout } = slice.actions;
export default slice.reducer;