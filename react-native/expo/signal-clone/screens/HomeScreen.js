import React, { useEffect, useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../firebase';
import CustomListItem from '../components/CustumListItem';
import { Avatar } from 'react-native-elements';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id, 
          data: doc.data()
        }))
      )
    })
    
    return unsubscribe;
  },[]);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: 'black' },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{marginLeft: 20 }}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar 
              rounded 
              source={{ uri: auth?.currentUser?.photoURL }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View 
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.5}
            onPress={() => { navigation.navigate("AddChat") }}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName
    });
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {(chats || []).map(({id, data: { chatName }}) => (
          <CustomListItem 
            key={id} 
            id={id} 
            chatName={chatName} 
            enterChat={enterChat} 
          />
        ))}          
      </ScrollView>
    </SafeAreaView>     
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10
  }
});
