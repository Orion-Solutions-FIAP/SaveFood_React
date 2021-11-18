import React, { useState, useEffect } from 'react'
import {
    Button,
    SpeedDial,
    ListItem
} from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { 
    StyleSheet,
    View,
    FlatList,
    Alert
} from 'react-native';

const ListExpired = (props) => {

    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)


    const deleteProduct = (id) => {
        firestore()
            .collection(auth().currentUser.uid)
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert('Produto deletado')
            })
            .catch((error) => {
                Alert.alert('Não foi possível deletar o produto')
            })
    }

    useEffect(() => {
        firestore()
            .collection(auth().currentUser.uid)
            .orderBy('vencimento','desc')
            .get()
            .then(querySnapshot => {
                const list = [];
                querySnapshot.forEach((doc) => {
                    if(doc.data().status == "Vencido"){
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
                        rightContent={
                            <Button
                            onPress={ () => deleteProduct(item.id)}
                            icon={{ name: 'delete', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red'}}
                            />
                        }
                        >
                        <ListItem.Content >
                            <View style={{flex: 1}} >
                                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                                    <ListItem.Title style={styles.itemStyle}>{item.nome}</ListItem.Title>
                                    <ListItem.Title style={styles.itemStyle}>{item.quantidade}</ListItem.Title>   
                                </View>
                                <View style={{flexDirection: 'row', justifyContent:'space-between',alignItems:'center', marginTop: 32}}>
                                    <ListItem.Title style={styles.dataItemStyle}>{item.vencimento}</ListItem.Title>
                                    <ListItem.Title style={styles.statusItemStyle}>{item.status}</ListItem.Title>
                                </View>
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
                title="Cadastrar Produto"
                onPress={() =>  props.navigation.navigate('productRegister')}
            />
            <SpeedDial.Action
                icon={{ name: 'delete', color: '#fff' }}
                title="Produtos Disponíveis"
                onPress={() => props.navigation.navigate('listAll')}
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

const styles = StyleSheet.create({
    itemStyle:{
        fontFamily:'PatrickHand-Regular',
        fontSize:24
        
    },

    dataItemStyle:{
        fontFamily:'PatrickHand-Regular',
        fontSize:20,
    },

    statusItemStyle:{
        fontFamily:'PatrickHand-Regular',
        fontSize:24,
        color:'red', 
        marginLeft:128
    },


})

export default ListExpired
