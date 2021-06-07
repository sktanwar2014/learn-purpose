import React, { useState, useRef, useEffect } from 'react';
import { Keyboard, StyleSheet, TextInput } from 'react-native';
import { useMutation, gql } from '@apollo/client';

import { Text, View } from '../Themed';
import Checkbox from '../Checkbox';

interface ToDoItemProps {
  todo: {
    id: string;
    content: string
    isCompleted: boolean;
  },
  onSubmit: () => void,
  handleDeleteTodo: () => void
}


const UPDATE_TODO = gql`
mutation updateToDo($id: ID!, $content: String, $isCompleted: Boolean ){
  updateToDo(id: $id, content: $content, isCompleted: $isCompleted ){
    id
    content
    taskList {
      title
      progress
      todos{
        id
        content
        isCompleted
      }
    }
  }
}
`;




const ToDoItem = ({ todo, onSubmit, handleDeleteTodo } : ToDoItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [content, setContent] = useState('');
  const [alreadyDeleted, setAlreadyDeleted] = useState(false);
  const input = useRef(null);
  
  const [ updateToDo ] = useMutation(UPDATE_TODO);

  const callUpdateTodo = async ({ isCompleted = isChecked }) => {
    if( !alreadyDeleted ){
      await updateToDo({ 
        variables: { 
          id: todo.id,
          content: content,
          isCompleted: isCompleted,
        }
      });
    }    
  }

  useEffect(() => {
    if(!todo) { return }
    
    setIsChecked(todo.isCompleted);
    setContent(todo.content);
  }, [todo]);

  useEffect(() => {
    if(input.current){
      input?.current?.focus();      
    }
  }, [input]);

  const onKeyPress = ({ nativeEvent }) => {
    if(nativeEvent.key === "Backspace" && content === ""){
      setAlreadyDeleted(true);
      handleDeleteTodo;
    }
  }


  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 3}}>
      <Checkbox 
        isChecked={isChecked} 
        onPress={() => {
          setIsChecked(!isChecked);
          callUpdateTodo({ isCompleted: !isChecked })
        }} 
      />
      <TextInput
        ref={input}
        value={content}
        onChangeText={setContent}
        style={{          
          flex: 1,
          fontSize: 18,
          color: 'white',
          marginLeft: 12
        }}
        multiline
        onEndEditing={callUpdateTodo}
        onSubmitEditing={onSubmit}
        blurOnSubmit
        onKeyPress={onKeyPress}
      />
    </View>
  )
}

export default ToDoItem;