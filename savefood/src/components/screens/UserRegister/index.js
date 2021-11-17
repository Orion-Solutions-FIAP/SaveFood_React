import React, {useState} from 'react'

import {
    Alert,
    SafeAreaView,
    Text,
    View
} from 'react-native'

import {
    Button,
    Input
} from 'react-native-elements'

import Header from '../../Header'

const UserRegister = (props) => {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    return(
        <SafeAreaView style={{flex : 1, backgroundColor : '#EB705B', padding : 16}} >

            <Header/>

            <Input label='Nome' labelStyle={{color : '#FFF', paddingTop : 20}} onChangeText={(txt) => setNome(txt)} value={nome}
            style={{backgroundColor : '#FFF', borderRadius : 10}}
            />

            <Input label='Email' 
            labelStyle={{color : '#FFF'}}
            onChangeText={(txt) => setEmail(txt)} value={email}
            style={{backgroundColor : '#FFF', borderRadius : 10}}
            />

            <Input label='Senha' 
            labelStyle={{color : '#FFF'}}
            onChangeText={(txt) => setSenha(txt)} value={senha} 
            style={{backgroundColor : '#FFF', borderRadius : 10}}
            />

            <Input  label='Repetir Senha'
            labelStyle={{color : '#FFF'}}
            style={{backgroundColor : '#FFF', borderRadius : 10}}
            />


            <View style={{flex : 1, flexDirection : 'row', justifyContent : 'space-evenly', alignItems : 'center'}}>
                <Button 
                buttonStyle={{width: 110, height: 55, backgroundColor : '#393E41'}}
                title='Voltar' />
                
                <Button 
                buttonStyle={{width: 110, height: 55, backgroundColor : '#B18FCF'}}
                title='Salvar' />
                
            </View>

        </SafeAreaView>
    )
}

export default UserRegister