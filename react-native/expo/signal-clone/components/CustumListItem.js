import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { db } from '../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp","desc")
      .onSnapshot((snapshot) => 
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      )
      
    return unsubscribe;
  })

  return (
    // <View></View>
    <ListItem       
      key={id} 
      bottomDivider
      onPress = { () => {enterChat(id, chatName)} }
    >
      <Avatar 
        rounded
        source= {{
          uri: chatMessages?.[0]?.photoURL ||
            "https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg"
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          { chatName }
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message }
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem;

const styles = StyleSheet.create({

});