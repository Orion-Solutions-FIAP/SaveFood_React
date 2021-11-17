import React from 'react'
import {
    Button
} from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import { PROPERTY_TYPES } from '@babel/types'

const ListAll = (props) => {
    return(
        <Button
            onPress={() => auth().signOut().then(() => props.navigation.navigate('home'))}
            title='Sair'/>
    )
}

export default ListAll