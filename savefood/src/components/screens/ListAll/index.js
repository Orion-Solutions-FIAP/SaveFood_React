import React, { useState, useEffect } from 'react'
import {
    Button,
    SpeedDial
} from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { 
    View,
    FlatList,
    Text,
    Alert
} from 'react-native';

const ListAll = (props) => {

    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        firestore()
            .collection(auth().currentUser.uid)
            .orderBy('vencimento','asc')
            .get()
            .then(querySnapshot => {
                const list = [];
                querySnapshot.forEach((doc) => {
                    if(doc.data().status == "Disponivel"){
                        list.push({ ...doc.data(), id: doc.id });
                    }
                })
                setProducts(list);
            })
            .catch((error) => {
                console.log(error)
            })
      }, []);

    return(
        <View style={{flex: 1}} >
        <FlatList
            data={products}
            renderItem={({ item }) => (
                <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Nome: {item.nome}</Text>
                </View>
            )}
        />

            <SpeedDial
            isOpen={open}
            icon={{ name: 'edit', color: '#fff' }}
            openIcon={{ name: 'close', color: '#fff' }}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}
            >
            <SpeedDial.Action
                icon={{ name: 'add', color: '#fff' }}
                title="Add"
                onPress={() => props.navigation.navigate('productRegister')}
            />
            <SpeedDial.Action
                icon={{ name: 'delete', color: '#fff' }}
                title="Delete"
                onPress={() => console.log('Delete Something')}
            />

            <SpeedDial.Action
                icon={{ name: 'logout', color: '#fff' }}
                title="Sair"
                onPress={() => auth().signOut().then(() => props.navigation.navigate('home'))}
            />
            </SpeedDial>
        </View>
    )
}

export default ListAll
