import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkUser = async ()  => {
      if(await isAuthenticated()){
        navigation.navigate('Home');
      }else {
        navigation.navigate('SignIn');
      }
    }

    checkUser();
  },[]);

  const isAuthenticated = async () => {
    // AsyncStorage.clear();
    const token = await AsyncStorage.getItem('token');
    return !!token;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
