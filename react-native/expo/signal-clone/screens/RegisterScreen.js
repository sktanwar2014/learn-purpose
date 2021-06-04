import React, { useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Image, Input, Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';


const INITIAL_VALUES = {
  full_name: '',
  email: '',
  password: '',
  image_url: ''
}
const RegisterScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState(INITIAL_VALUES);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  }
  const register = () => {
    auth
      .createUserWithEmailAndPassword(inputs.email, inputs.password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: inputs.full_name,
          photoURL: 
            inputs.image_url || 
            "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
        })
      })
      .catch((error) => alert(error.message));
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}> 
        Create a Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input 
          placeholder="Full Name"
          autoFocus
          value={inputs.full_name}
          onChangeText={(value) => {handleChange('full_name', value)}}
        />
        <Input 
          placeholder="Email"
          type="email"
          value={inputs.email}
          onChangeText={(value) => {handleChange('email', value)}}
        />
        <Input 
          placeholder="Password" 
          secureTextEntry 
          type="password" 
          value={inputs.password}
          onChangeText={(value) => {handleChange('password', value)}}
        />
        <Input 
          placeholder="Profile Picture URL (Optional)" 
          value={inputs.image_url}
          onChangeText={(value) => {handleChange('image_url', value)}}
          onSubmitEditing={register}
        />
      </View>
      {/* <Button
        containerStyle={styles.button} 
        title = "Login" 
      /> */}
      <Button
        containerStyle={styles.button} 
        title = "Register" 
        onPress={register}
        raised
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;

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
