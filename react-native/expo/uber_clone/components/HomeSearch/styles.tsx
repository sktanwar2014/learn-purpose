import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  inputBox:{
    backgroundColor: '#e7e7e7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    padding: 10
  },
  inputText:{
    color: '#434343',
    fontWeight: '600',
    fontSize: 20
  },
  timeContainer:{
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: 100,
    borderRadius: 50
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: 20,
    alignItems: 'center',
    borderColor: '#dbdbdb'
  },
  iconContainer: {
    backgroundColor: '#b3b3b3',
    borderRadius: 25,
    padding: 10
  },
  destinationText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500'
  }
});


export default styles;