import { EMPLOYEE_CREATE_REQUEST, EMPLOYEE_CREATE_FAIL, EMPLOYEE_CREATE_SUCCESS, EMPLOYEE_FETCH_SUCCESS } from '../action/type'

const initialState = {
  list   : {},
  loading: false,
  error  : '',
}

export default (state = initialState, { type, payload }) => {
  if(type === EMPLOYEE_CREATE_REQUEST){
    return { ...state, loading: true, error: '' }
  }
  if(type === EMPLOYEE_CREATE_SUCCESS){
    return { ...state, loading: false, error: '' }
  }
  if(type === EMPLOYEE_CREATE_FAIL){
    return { ...state, loading: false, error: payload }
  }

  if(type === EMPLOYEE_FETCH_SUCCESS){
    return { ...state, list: payload }
  }

  return state
}