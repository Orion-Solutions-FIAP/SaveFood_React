import React, { useState, useEffect } from 'react'
import {
    Button,
    SpeedDial,
    ListItem
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


    const deleteProduct = (id) => {
        firestore().collection(auth().currentUser.uid).doc(id).delete();
    }

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
        <View style={{flex: 1, padding : 16}} >
        <FlatList
            data={products}
            renderItem={({ item }) => (
                <View style={{paddingBottom : 10}} >
                    <ListItem.Swipeable
                        leftContent={
                            <Button
                            title="Consumido"
                            icon={{ name: 'check', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'lightgreen' }}
                            />
                        }
                        rightContent={
                            <View style={{display: 'flex', flexDirection: 'row'}} >
                            <Button
                            onPress={ () => props.navigation.navigate('updateProduct', {
                                id : item.id,
                                nome : item.nome,
                                vencimento : item.vencimento,
                                quantidade : item.quantidade
                            })
                        }
                            icon={{ name: 'edit', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'orange', width: 65 }}
                            />

                            <Button
                            onPress={ () => deleteProduct(item.id)}
                            icon={{ name: 'delete', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red', width: 65 }}
                            />
                            </View>
                        }
                        >
                        <ListItem.Content>
                            <View style={{flex: 1}} >
                                <ListItem.Title >{item.nome}</ListItem.Title>
                                <ListItem.Title style={{color:'red'}}>Validade: {item.vencimento}</ListItem.Title>
                            </View>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem.Swipeable>

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
                onPress={() =>  props.navigation.navigate('productRegister')}
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
