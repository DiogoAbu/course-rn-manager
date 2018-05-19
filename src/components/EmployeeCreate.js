import React from 'react'
import { Alert, Platform, StyleSheet, Text, View } from 'react-native'
import { Linking } from 'expo' // eslint-disable-line import/named

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { employeeCreate, employeePut, employeeDelete } from '../action'
import { EMPLOYEE_CREATE_SUCCESS } from '../action/type'
import { Card, CardSection, Input, Picker, Spinner, Button } from './common'

class EmployeeCreate extends React.PureComponent {
  static navigationOptions = ({ navigation : { getParam } }) => ({
    title: getParam('uid', null) ? 'Edit Employee' : 'Create Employee',
  })

  state = {
    uid  : '',
    name : '',
    phone: '',
    shift: 'Monday',
  }

  UNSAFE_componentWillMount = () => {
    const { dispatch, navigation: { getParam } } = this.props

    dispatch({ type: EMPLOYEE_CREATE_SUCCESS })

    this.setState({
      uid  : getParam('uid', ''),
      name : getParam('name', ''),
      phone: getParam('phone', ''),
      shift: getParam('shift', 'Monday'),
    })
  }

  _onPressCreate = () => {
    const { name, phone, shift } = this.state

    this.props.employeeCreate({ name, phone, shift })
  }

  _onPressUpdate = () => {
    const { uid, name, phone, shift } = this.state

    this.props.employeePut({ uid, name, phone, shift })
  }

  _onPressDelete = () => {
    const { uid, name } = this.state

    Alert.alert(
      'Fire Employee',
      `Do you really want to fire ${name}?`,
      [
        { text: 'No', onPress: null, style: 'cancel' },
        { text: 'Yes', onPress: () => this.props.employeeDelete({ uid }), style: 'destructive' },
      ]
    )
  }

  _onPressText = () => {
    const { name, phone, shift } = this.state

    const textBody = `Hey ${name} you're gonna work ${shift}, okay?`

    const textIos = `sms:${phone};body=${textBody}`
    const textAnd = `sms:${phone}?body=${textBody}`

    Linking.openURL(Platform.OS === 'ios' ? textIos : textAnd)
  }

  render() {
    return (
      <View style={styles.body}>
        <Card>
          <CardSection>
            <Input
              label='Name'
              onChangeText={name => this.setState({ name })}
              placeholder='Full name'
              value={this.state.name}
            />
          </CardSection>
        
          <CardSection>
            <Input
              keyboardType='numeric'
              label='Phone'
              onChangeText={phone => this.setState({ phone })}
              placeholder='555-555-55555'
              value={this.state.phone}
            />
          </CardSection>
        
          <CardSection style={styles.pickerView}>
            <Picker
              data={[ 
                { label: 'Monday', value: 'Monday' },
                { label: 'Tuesday', value: 'Tuesday' },
                { label: 'Wednesday', value: 'Wednesday' },
                { label: 'Thursday', value: 'Thursday' },
                { label: 'Friday', value: 'Friday' },
                { label: 'Saturday', value: 'Saturday' },
                { label: 'Sunday', value: 'Sunday' },
              ]}
              label='Shift'
              onValueChange={shift => this.setState({ shift })}
              selectedValue={this.state.shift}
            />
          </CardSection>
        
          {this.props.error ? <Text style={styles.error}>{this.props.error}</Text> : null}

          <CardSection>
            {this.props.loading ? (
              <Spinner />
            ) : (
              <Button
                onPress={this.state.uid ? this._onPressUpdate : this._onPressCreate}
                text={this.state.uid ? 'Update' : 'Create'}
              />
            )}
          </CardSection>

          {this.state.uid ? (
            <CardSection>
              <Button
                brand='success'
                onPress={this._onPressText}
                text='Text Schedule'
              />
            </CardSection>
          ) : null}
          
          {!this.props.loading && this.state.uid ? (
            <CardSection>
              <Button
                brand='error'
                onPress={this._onPressDelete}
                text='Fire'
              />
            </CardSection>
          ) : null}
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
  loading: state.employee.loading,
  error  : state.employee.error,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({ employeeCreate, employeePut, employeeDelete }, dispatch),
})

export default {
  screen: connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate),
  
  navigationOptions: {},
}