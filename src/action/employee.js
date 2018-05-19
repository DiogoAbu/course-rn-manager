import firebase from 'firebase'
import { NavigationActions } from 'react-navigation'

import { EMPLOYEE_CREATE_REQUEST, EMPLOYEE_CREATE_SUCCESS, EMPLOYEE_CREATE_FAIL, EMPLOYEE_FETCH_SUCCESS } from './type'

export const employeeFetch = () => async dispatch => {
  const { currentUser } = firebase.auth()
  
  try {
    await firebase.database()
      .ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEE_FETCH_SUCCESS, payload: snapshot.val() || {} })
      })

  } catch(e) {
    dispatch({ type: EMPLOYEE_CREATE_FAIL, payload: 'Creation failed' })
  }
}

export const employeeCreate = ({ name, phone, shift }) => async dispatch => {
  dispatch({ type: EMPLOYEE_CREATE_REQUEST })

  const { currentUser: { uid } } = firebase.auth()

  try {
    await firebase.database()
      .ref(`/users/${uid}/employees`)
      .push({ name, phone, shift })

    dispatch({ type: EMPLOYEE_CREATE_SUCCESS })
    dispatch(NavigationActions.back())

  } catch(e) {
    dispatch({ type: EMPLOYEE_CREATE_FAIL, payload: 'Creation failed' })
  }
}

export const employeePut = ({ uid, name, phone, shift }) => async dispatch => {
  dispatch({ type: EMPLOYEE_CREATE_REQUEST })

  const { currentUser } = firebase.auth()
  
  try {
    await firebase.database()
      .ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })

    dispatch({ type: EMPLOYEE_CREATE_SUCCESS })
    dispatch(NavigationActions.back())

  } catch(e) {
    dispatch({ type: EMPLOYEE_CREATE_FAIL, payload: 'Update failed' })
  }
}

export const employeeDelete = ({ uid }) => async dispatch => {
  dispatch({ type: EMPLOYEE_CREATE_REQUEST })

  const { currentUser } = firebase.auth()
  
  try {
    await firebase.database()
      .ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()

    dispatch({ type: EMPLOYEE_CREATE_SUCCESS })
    dispatch(NavigationActions.back())

  } catch(e) {
    dispatch({ type: EMPLOYEE_CREATE_FAIL, payload: 'Deletion failed' })
  }
}