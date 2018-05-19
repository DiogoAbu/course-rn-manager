import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { CardSection } from './common'

class EmployeeDetail extends React.PureComponent {
  _onPressItem = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'EmployeeCreate', params: this.props.data }))
  }

  render = () => {
    const { data } = this.props

    return (
      <TouchableWithoutFeedback onPress={this._onPressItem}>
        <View>
          <CardSection style={styles.view}>
            <Text style={styles.textMain}>{data.name}</Text>
            <Text style={styles.textFade}>{data.phone}</Text>
            <Text style={styles.textFade}>{data.shift}</Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    paddingVertical  : 12,
    paddingHorizontal: 24,
  },

  textMain: {
    fontSize  : 18,
    fontWeight: '600',
  },

  textFade: {
    fontSize  : 18,
    opacity   : .7,
    marginLeft: 12,
  },
})

export default connect()(EmployeeDetail)