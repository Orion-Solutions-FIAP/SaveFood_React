import React, {useState, useEffect} from 'react'

import {
    Alert,
    SafeAreaView,
    Text,
    View,
    LogBox 

} from 'react-native'

import {
    Button,
    Input
} from 'react-native-elements'

import Header from '../../Header'

import DatePicker from 'react-native-datepicker'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

LogBox.ignoreAllLogs()

const UpdateProduct = (props) => {
    
    const [nome, setNome] = useState(props.route.params.nome)
    const [vencimento, setVencimento] = useState(props.route.params.vencimento)
    const [quantidade, setQuantidade] = useState(props.route.params.quantidade)
    const [id, setId] = useState(props.route.params.id)

    const editarProduto = (nome, vencimento, quantidade, id) => {
        firestore().collection(auth().currentUser.uid).doc(id).update({
          nome: nome,
          vencimento: vencimento,
          status : 'Disponivel',
          quantidade : quantidade
        })
        props.navigation.navigate('listAll');
      }

    return(
        <SafeAreaView style={{flex : 1, backgroundColor : '#56A75F', padding : 16}} >

            <Header/>

            <Input label='Nome' labelStyle={{color : '#FFF', paddingTop : 20}} onChangeText={(txt) => setNome(txt)} value={nome}
            style={{backgroundColor : '#FFF', borderRadius : 10}}
            />

            <Text style={{paddingLeft : 11, fontWeight: 'bold', color : '#fff', fontSize : 16}} >Data de Vencimento</Text>

            <DatePicker 
            style={{width : 200}}
            mode="date"
            format="DD-MM-YYYY" 
            date={vencimento} 
            onDateChange={(txt) => setVencimento(txt)}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"

            customStyles={{
                dateIcon: {
                //display: 'none',
                left: 0,
                top: 1,
                marginLeft: 3,
                },
                dateInput: {
                backgroundColor : '#FFF',
                marginLeft: 10,
                borderRadius : 10, 
                },
            }}
            
            />

            <Input 
                keyboardType='numeric'
                label='Quantidade' 
                labelStyle={{color : '#FFF', paddingTop : 20}} 
                onChangeText={(txt) => setQuantidade(txt)} 
                value={quantidade}
                style={{backgroundColor : '#FFF', borderRadius : 10}}
            />



            <View style={{flex : 1, flexDirection : 'row', justifyContent : 'space-evenly', alignItems : 'center'}}>
                <Button 
                buttonStyle={{width: 110, height: 55, backgroundColor : '#393E41'}}
                title='Voltar' />
                
                <Button 
                onPress={() => editarProduto(nome, vencimento, quantidade, id)}
                buttonStyle={{width: 110, height: 55, backgroundColor : '#E94F37'}}
                title='Salvar' />
                
            </View>

        </SafeAreaView>
    )
}

export default UpdateProduct 