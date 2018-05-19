import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase'

import { LOGIN_SUCCESS } from '../action/type'
import { loginUser } from '../action'
import { Button, Card, CardSection, Input, Spinner } from './common'

class LoginForm extends React.PureComponent {
  static navigationOptions = () => ({
    title: 'Login',
  })

  state = {
    mail   : '',
    pass   : '',
    loading: true,
  }

  componentDidMount = () => {
    const firebaseCheck = setInterval(() => {
      if (firebase.app()) {
        clearInterval(firebaseCheck)

        firebase.auth().onAuthStateChanged(user => {
          this.setState({ loading: false })
          
          if(user){
            this.props.dispatch({ type: LOGIN_SUCCESS, payload: user })
            this.props.dispatch(NavigationActions.navigate({ routeName: 'Home' }))
          }
        })
      }
    }, 250)
    
  }

  _onPressLogin = () => {
    const { state: { mail, pass }, props: { loginUser } } = this

    loginUser({ mail, pass })
  }

  render() {
    if(this.state.loading) return <Spinner />

    return (
      <View style={styles.body}>
        <Card>
          <CardSection>
            <Input
              autoCapitalize='none'
              keyboardType='email-address'
              label='Mail'
              onChangeText={mail => this.setState({ mail })}
              placeholder='mail@example.com'
              value={this.state.mail}
            />
          </CardSection>

          <CardSection>
            <Input
              autoCapitalize='none'
              label='Password'
              onChangeText={pass => this.setState({ pass })}
              onSubmitEditing={this._onPressLogin}
              placeholder='password'
              returnKeyType='go'
              secureTextEntry
              value={this.state.pass}
            />
          </CardSection>

          {this.props.error ? <Text style={styles.error}>{this.props.error}</Text> : null}

          <CardSection>
            {this.props.loading ? (
              <Spinner />
            ) : (
              <Button
                onPress={this._onPressLogin}
                text={'Login'}
              />
            )}
          </CardSection>
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex           : 1,
    backgroundColor: '#fff',
  },

  error: {
    color     : 'red',
    fontSize  : 20,
    alignSelf : 'center',
    paddingTop: 6,
  },
})

const mapStateToProps = state => ({
  error  : state.auth.error,
  loading: state.auth.loading,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({ loginUser }, dispatch),
})

export default {
  screen: connect(mapStateToProps, mapDispatchToProps)(LoginForm),
  
  navigationOptions: {},
}