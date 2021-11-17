import React from 'react'

import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from './src/components/Header'
import UserRegister from './src/components/screens/UserRegister'
import ProductRegister from './src/components/screens/ProductRegister'
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

        <Stack.Screen component={ProductRegister} name='productRegister' options={{title:'Cadastro de Produto'}} />
        <Stack.Screen component={UserRegister} name='userRegister' options={{title:'Cadastro de Usuário'}} />
        <Stack.Screen name="home" component={Home}/>
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name="listAll" component={ListAll}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App