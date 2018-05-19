import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../action/type'

const initialState = {
  user   : null,
  error  : '',
  loading: false,
}

export default (state = initialState, { type, payload }) => {
  if(type === LOGIN_REQUEST){
    return { ...state, ...initialState, loading: true }
  }
  if(type === LOGIN_SUCCESS){
    return { ...state, ...initialState, user: payload }
  }
  if(type === LOGIN_FAIL){
    return { ...state, ...initialState, error: payload }
  }

  return state
}