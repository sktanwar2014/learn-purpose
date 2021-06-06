import React, { useState } from 'react';
import { StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

import { Text, View } from '../components/Themed';
import ToDoItem from '../components/ToDoItem';


export default function ToDoScreen() {
  let id = '4';
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([
    {
      id: '1',
      content: 'Buy Milk',
      isCompleted: false,      
    },
    {
      id: '2',
      content: 'Buy Chocolate',
      isCompleted: false,      
    },
    {
      id: '3',
      content: 'Close the door',
      isCompleted: false,      
    }
  ]);

  const createNewItem = (atIndex: number) => {
    const newTodos = [...todos];
    newTodos.splice(atIndex, 0, {
      id: Math.random().toString(),
      content: '',
      isCompleted: false
    })
    setTodos(newTodos);
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
        <TextInput
          value={title} 
          onChangeText={setTitle}
          placeholder="Title"
          style={styles.title}
        />

        <FlatList
          data={todos}
          renderItem={({ item, index }) => ( 
            <ToDoItem 
              todo={item} 
              onSubmit={() => createNewItem(index + 1)}  
            />
          )}
          style={{width: '100%'}}
        />
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    width: '100%'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
