import React, { useEffect, useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../firebase';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View 
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Avatar 
            rounded 
            source={{ 
              // uri: "https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg"
              uri: messages[0]?.data.photoURL
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity 
          style={{ marginLeft: 10 }}
          onPress= {() => {navigation.goBack()}}
        >
          <AntDesign name="arrowleft" color="white" size={24} />
        </TouchableOpacity>
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
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.5}
            onPress={() => { navigation.navigate("AddChat") }}
          >
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation]);
 

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    
    setInput("");
  }

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp","asc")
      .onSnapshot((snapshot) => setMessages(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      ))
    
    return unsubscribe;
  }, [route]);
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "iso" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {(messages || []).map(({id, data}) => 
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar 
                      position="absolute"
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5
                      }}
                      bottom={-15}
                      right={-5}
                      rounded
                      size={30}
                      source={{
                        uri: data.photoURL
                      }}
                    />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar 
                      position="absolute"
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5
                      }}
                      bottom={-15}
                      left={-5}
                      rounded
                      size={30}
                      source={{
                        uri: data.photoURL
                      }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput 
                placeholder="Signal Message" 
                value={input}
                onChangeText={(text)=>{setInput(text)}}
                onSubmitEditing={sendMessage}
                style={styles.textInput}
              />
              <TouchableOpacity
                onPress={sendMessage}
                activeOpacity={0.5}
              >
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>   
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  footer: {
    width: "100%",
    alignItems: "center",
    padding: 15,
    flexDirection: "row"
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "gray",
    borderRadius: 30
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginBottom: 20,
    marginRight: 15,
    maxWidth: "80%",
    position: "relative"
  },
  recieverText: {},
  sender: {
    padding: 15,
    backgroundColor: "#2868E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginBottom: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative"
  },
  senderText:{
    color: "white",
    fontWeight: "500",
    marginBottom: 15,
    marginLeft: 10
  },
  senderName:{
    left: 10,
    color: "white",
    fontSize: 10,
    paddingRight: 10
  },  
});
