import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import styles from './styles';

const SearchResults = () => {
  // const [originPlace, setOriginPlace] = useState(null);
  // const [destinationPlace, setDestinationPlace] = useState(null);

  // useEffect(() => {
  //   if(originPlace && destinationPlace){
  //     console.log('redirect to map')
  //   }
  // }, [originPlace, destinationPlace])

  return (
    <SafeAreaView>
      <View
        style={styles.container}
      >
         <Text>result</Text>
      </View>
    </SafeAreaView>
  )
}

export default SearchResults;