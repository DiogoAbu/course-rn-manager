import React from 'react'
import { BackHandler } from 'react-native'

import { Provider, connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import firebase from 'firebase'

import store from './constant/store'
import AppNavigator from './navigator/AppNavigator'

const addListener = createReduxBoundAddListener('root')
class App extends React.PureComponent {
  state = {
    loading: true,
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress)

    firebase.initializeApp({
      apiKey           : 'AIzaSyDgw42ict72kX-RVTFeWis0hwAL9W9Xzco',
      authDomain       : 'manager-8b57b.firebaseapp.com',
      databaseURL      : 'https://manager-8b57b.firebaseio.com',
      projectId        : 'manager-8b57b',
      storageBucket    : '',
      messagingSenderId: '660498364644',
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress)
  }

  _onBackPress = () => {
    const { dispatch, nav } = this.props
    
    if (nav.index === 0 && nav.routes[0].index === 0) return false
    if (nav.index === 1 && nav.routes[1].index === 0) return false

    dispatch(NavigationActions.back())
    return true
  }

  render() {
    const { dispatch, nav } = this.props

    return <AppNavigator navigation={{ addListener, dispatch, state: nav }} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
})

const AppWithNavigationState = connect(mapStateToProps)(App)

const Root = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
)

export default Root