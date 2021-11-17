import React from 'react'
import Login from './src/components/screens/Login'
import Home from './src/components/screens/Home'
import ListAll from './src/components/screens/ListAll'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home}/>
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name="listAll" component={ListAll}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App