import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
}

const getInitialStateFromLocalStorage = () => {
  let user = localStorage.getItem('user')
  if (user) return JSON.parse(user);
  return initialState;
}

export const updateUserToLocalStorage = user => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const userSlice = createSlice({
  name: 'user',
  initialState: getInitialStateFromLocalStorage(),
  reducers: {
    logout(state) {
      state = initialState
      return state;
    },
    login(state, action) {
      state = {
        ...action.payload,
        loggedIn: true,
      }
      return state;
    },
    setSavedCodes(state, action) {
      state.savedCodes = action.payload || [];
    }
  }
})

export const userActions = userSlice.actions;