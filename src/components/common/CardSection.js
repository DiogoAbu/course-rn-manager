import React from 'react'
import { StyleSheet, View } from 'react-native'

const CardSection = props => (
  <View style={[ styles.view, props.style ]}>
    {props.children}
  </View>
)

const styles = StyleSheet.create({
  view: {
    borderBottomWidth: 1,
    padding          : 6,
    backgroundColor  : '#fff',
    borderColor      : '#ddd',
    position         : 'relative',
    flexDirection    : 'row',
    justifyContent   : 'flex-start',
    alignItems       : 'center',
  },
})

export default CardSection