import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Navigation from '../navigation';


const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const onSubmit = () => {
    console.log('submit');
  }

  return (
    <View style={styles.container}>
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
        style={styles.btnLogin}
        onPress={onSubmit}
      >
        <Text
          style={styles.loginText}
        >
          Sign In
        </Text>
      </Pressable>

      <Pressable
        style={styles.btnSignup}
        onPress={() => {navigation.navigate('SignUp')}}
      >
        <Text
          style={styles.signUpText}
        >
          New here? Sign up
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
    fontSize: 18,    
  }, 
  btnLogin: {
    backgroundColor: '#e33062',
    marginTop: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  btnSignup: {
    marginTop: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  signUpText: {
    color: '#e33062',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default SignInScreen;