import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styles from './styles';


const CovidMessage = () => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
      >
        Travel if only neccessary
      </Text>
      <Text
        style={styles.text}
      >
        Hi sir, can you please make a video for us about how to deploy expo/react native app on play store & app store with database ? it will be grateful for all of the your viewers.
      </Text>
      <Text
        style={styles.learnMore}
      >
        Learn more
      </Text>

    </View>
  )
} 

export default CovidMessage;