import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, ActivityIndicator, Text, TextInput, View, Alert } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from '../navigation';


const SIGN_UP_MUTATION = gql`mutation signUp(
  $email: String!,
  $password: String!,
  $name: String!){
  signUp(input: {
    email: $email
    password: $password
    name: $name
  }){
    token
    user {
      id
      name
    }
  }
}`;

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // mutation[0]: A function to trigger the mutation
  // mutation[1]: result Object { data, error, loading }

  const [ signUp, { data, error, loading } ] = useMutation(SIGN_UP_MUTATION);

  const onSubmit = async () => {
    await signUp({variables: { name, email, password }});
  }

  if(error){
    Alert.alert('Error signing up. try again');
  }

  if(data){
    
    AsyncStorage
      .setItem('token', data.signUp.token)
      .then(() => {
        navigation.navigate('Home');
      })
  }

  
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.inputs}
        placeholder="name"
        placeholderTextColor="gray"  
        value={name}
        onChangeText={setName}
      />
      <TextInput 
        style={styles.inputs}
        placeholder="sktanwar.2014@gmail.com"
        placeholderTextColor="gray" 
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        style={styles.inputs}
        placeholder="password"
        placeholderTextColor="gray" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable
        style={styles.btnSignup}
        onPress={onSubmit}
        disabled={loading}
      >
        <Text
          style={styles.signUpText}
        >
          {loading && <ActivityIndicator />}
          Sign Up
        </Text>
      </Pressable>

      <Pressable
        style={styles.btnLogin}
        onPress={() => {navigation.navigate('SignIn')}}
      >
        <Text
          style={styles.loginText}
        >
          Already have an account? Sign in
        </Text>
      </Pressable>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    padding: 20,
  },
  inputs: {
    width: '100%',
    marginVertical: 25,
    color: 'white',
    fontSize: 18
  }, 
  btnSignup: {
    backgroundColor: '#e33062',
    marginTop: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  signUpText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  btnLogin: {
    marginTop: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  loginText: {
    color: '#e33062',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default SignUpScreen;