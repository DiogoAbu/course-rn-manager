import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Header = props => (
  <View style={styles.view}>
    <Text style={styles.text}>{props.title}</Text>
  </View>
)

const styles = StyleSheet.create({
  view: {
    height         : 72,
    paddingTop     : 24,
    justifyContent : 'center',
    alignItems     : 'center',
    backgroundColor: '#F8F8F8',
    shadowColor    : '#000',
    shadowOffset   : { width: 0, height: 2 },
    shadowOpacity  : 0.2,
    elevation      : 2,
    position       : 'relative',
  },
  text: {
    fontSize: 20,
  },
})

export default Header