import React from 'react'
import { Picker as NativePicker, StyleSheet, TextInput, Text, View } from 'react-native'

const Input = props => (
  <View style={styles.view}>
    <Text style={styles.text}>{props.label}</Text>
    <TextInput
      autoCorrect={false}
      underlineColorAndroid='transparent'
      {...props}
      style={[ styles.border, styles.input, props.style ]}
    />
  </View>
)

export const Picker = props => (
  <View style={styles.view}>
    <Text style={styles.text}>{props.label}</Text>
    <View style={[ styles.border, styles.viewPicker ]}>
      <NativePicker
        {...props}
        style={styles.picker}
      >
        {props.data.map(each => (
          <NativePicker.Item
            key={each.value}
            label={each.label}
            style={styles.pickerItem}
            value={each.value}
          />
        ))}
      </NativePicker>
    </View>
  </View>
)

const styles = StyleSheet.create({
  view: {
    flex          : 1,
    height        : 48,
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems    : 'stretch',
  },

  text: {
    flex             : 2,
    alignSelf        : 'center',
    fontSize         : 18,
    fontWeight       : '600',
    textAlign        : 'right',
    paddingHorizontal: 6,
  },
  
  input: {
    flex             : 5,
    fontSize         : 18,
    paddingHorizontal: 12,
    marginHorizontal : 6,
  },

  viewPicker: {
    flex             : 5,
    flexDirection    : 'row',
    justifyContent   : 'center',
    alignItems       : 'stretch',
    paddingHorizontal: 12,
    marginHorizontal : 6,
  },

  picker: {
    flex: 1,
  },

  pickerItem: {
    fontSize: 18,
  },

  border: {
    borderWidth  : 1,
    borderRadius : 2,
    borderColor  : '#ddd',
    shadowColor  : '#000',
    shadowOffset : { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius : 2,
  },
})

export default Input