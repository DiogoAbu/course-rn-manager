import firebase from 'firebase'

import { LOGIN_REQUEST, LOGIN_FAIL } from './type'

export const loginUser = ({ mail, pass }) => async dispatch => {
  dispatch({ type: LOGIN_REQUEST })

  try {
    return await firebase.auth().signInWithEmailAndPassword(mail, pass)

  } catch(e) {
    // Continue to user creation
  }

  try {
    return await firebase.auth().createUserWithEmailAndPassword(mail, pass)

  } catch(e) {
    dispatch({ type: LOGIN_FAIL, payload: 'Authentication failed' })
  }
}