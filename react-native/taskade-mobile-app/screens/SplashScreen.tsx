import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    if(isAuthenticated()){
      navigation.navigate('Home');
    }else {
      navigation.navigate('SignIn');
    }
  },[]);

  const isAuthenticated = () => {
    return false
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
