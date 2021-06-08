import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import styles from './styles';

const DestinationSearch = () => {
  const [originPlace, setOriginPlace] = useState(null);
  const [destinationPlace, setDestinationPlace] = useState(null);

  useEffect(() => {
    if(originPlace && destinationPlace){
      console.log('redirect to map')
    }
  }, [originPlace, destinationPlace])

  return (
    <SafeAreaView>
      <View
        style={styles.container}
      >
        <GooglePlacesAutocomplete
          placeholder='Where to?'
          onFail={(e) => console.log(e)}
          onPress={(data, details = null) => {
            setOriginPlace({ data, details });
          }}
          fetchDetails
          styles={{
            textInput: styles.textInput,
          }}
          query={{
            key: 'AIzaSyCSxyP9pPNIYcEZ36QcaQGWxxkUdo2wJdg',
            language: 'en',
          }}
        />
        
        <GooglePlacesAutocomplete
          placeholder='Where to?'
          onFail={(e) => console.log(e)}
          onPress={(data, details = null) => {
            setDestinationPlace({ data, details });
          }}
          fetchDetails
          styles={{
            textInput: styles.textInput,
          }}
          query={{
            key: 'AIzaSyCSxyP9pPNIYcEZ36QcaQGWxxkUdo2wJdg',
            language: 'en',
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default DestinationSearch;