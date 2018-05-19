import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

class Button extends React.PureComponent {
  _onPress = (...args) => {
    requestAnimationFrame(() => {
      this.props.onPress(...args)
    })
  }

  render = () => (
    <TouchableOpacity
      {...this.props}
      onPress={this._onPress}
      style={[
        styles.button,
        this.props.disabled ? styles.buttonDisabled : null,
        this.props.brand ? styles[`button_${this.props.brand.toLowerCase()}`] : null,
        this.props.style,
      ]}
    >
      <Text style={[
        styles.text,
        this.props.disabled ? styles.textDisabled : null,
        this.props.brand ? styles[`text_${this.props.brand.toLowerCase()}`] : null,
      ]}
      >
        {this.props.text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flex            : 1,
    alignSelf       : 'stretch',
    backgroundColor : '#fff',
    borderRadius    : 6,
    borderWidth     : 1,
    borderColor     : '#007aff',
    marginHorizontal: 6,
  },
  buttonDisabled: {
    borderColor: '#BBBEC1',
  },
  button_success: {
    borderColor: '#27ae60',
  },
  button_error: {
    borderColor: '#e74c3c',
  },

  text: {
    alignSelf      : 'center',
    color          : '#007aff',
    fontSize       : 16,
    fontWeight     : '600',
    paddingVertical: 12,
  },
  textDisabled: {
    color: '#BBBEC1',
  },
  text_success: {
    color: '#27ae60',
  },
  text_error: {
    color: '#e74c3c',
  },
})

export default Button