import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeMap = () => {
  return (
    <View style={styles.container}>
      <Text>I am map</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300, 
    width: '100%',
    backgroundColor: '#a0abff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default HomeMap;