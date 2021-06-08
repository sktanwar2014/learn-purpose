import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import styles from './styles';



const HomeSearch = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Text 
          style={styles.inputText}
        >
          Where to?
        </Text>
        <View style={styles.timeContainer}>
          <Ionicons name="time" size={16} color="black" />
          <Text>Now</Text>
          <MaterialIcons name="keyboard-arrow-down" size={16} color="black" />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Ionicons name="time" size={20} color="#fff" />
        </View>
        <Text style={styles.destinationText}>
          Spin Nightclub
        </Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.iconContainer, {backgroundColor: '#21bcff'}]}>
          <Fontisto name="home" size={22} color="#fff" />
        </View>
        <Text style={styles.destinationText}>
          Spin Nightclub
        </Text>
      </View>
    </View>


  )
}

export default HomeSearch;