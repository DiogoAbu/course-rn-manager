import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import { createReactNavigationReduxMiddleware, createNavigationReducer } from 'react-navigation-redux-helpers'

import * as reducer from '../reducer'
import AppNavigator from '../navigator/AppNavigator'

const navReducer = createNavigationReducer(AppNavigator)
const navMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav)

const combinedReducer = combineReducers({
  ...reducer,
  nav: navReducer,
})

const combinedMiddleware = applyMiddleware(navMiddleware, reduxThunk)

export default createStore(combinedReducer, combinedMiddleware)