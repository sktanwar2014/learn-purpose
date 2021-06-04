import React, { useEffect, useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddChatScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new Chat',
      headerBackTitle: 'Chat'
    })
  }, [navigation]);

  const createChat = async () => {
    await db
            .collection("chats")
            .add({ 
              chatName: inputs 
            })
            .then(() => {
              navigation.goBack()
            })
            .catch((error) => alert(error))
  }
  
  return (
     <View style={styles.container}>
       <Input 
        placeholder="Enter a new Chat"
        value={inputs}
        onChangeText={(text) => { setInputs(text)}}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
        onSubmitEditing={createChat}
       />
       <Button disabled={!inputs} title="Create new Chat" onPress={createChat} />
     </View>
  );
}

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white"
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10
  }
});
