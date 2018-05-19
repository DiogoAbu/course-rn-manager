import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'

import LoginForm from '../components/LoginForm'
import EmployeeList from '../components/EmployeeList'
import EmployeeCreate from '../components/EmployeeCreate'

const Login = createStackNavigator({
  LoginForm,
})

const Home = createStackNavigator(
  {
    EmployeeList,
    EmployeeCreate,
  }, {
    initialRouteName: 'EmployeeList',
    transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
  }
)

export default createSwitchNavigator(
  {
    Login,
    Home,
  },
  {
    initialRouteName: 'Login',
  }
)
