import React from 'react'
import { StyleSheet } from 'react-native'

import { connect } from 'react-redux'
import HeaderButtons from 'react-navigation-header-buttons-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { FlatList } from 'react-native-gesture-handler'
import { employeeFetch } from '../action'
import EmployeeDetail from './EmployeeDetail'

class EmployeeList extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title      : 'Employees',
    headerRight: (
      <HeaderButtons
        IconComponent={MaterialCommunityIcons}
        iconSize={24}
      >
        <HeaderButtons.Item
          iconName='plus'
          onPress={() => navigation.navigate('EmployeeCreate')}
          title='Add'
        />
      </HeaderButtons>
    ),
  })

  componentDidMount = () => {
    this.props.employeeFetch()
  }

  _renderItem = ({ item }) => <EmployeeDetail data={item} />

  _keyExtractor = (item) => item.uid

  render() {
    return (
      <FlatList
        data={this.props.list}
        initialNumToRender={50}
        keyExtractor={this._keyExtractor}
        maxToRenderPerBatch={50}
        removeClippedSubviews={false}
        renderItem={this._renderItem}
        style={styles.body}
      />
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex           : 1,
    backgroundColor: '#fff',
  },
})

const mapStateToProps = ({ employee }) => ({
  list: Object.keys(employee.list).map(uid => ({ uid, ...employee.list[uid] })),
})

export default {
  screen: connect(mapStateToProps, { employeeFetch })(EmployeeList),
  
  navigationOptions: {},
}