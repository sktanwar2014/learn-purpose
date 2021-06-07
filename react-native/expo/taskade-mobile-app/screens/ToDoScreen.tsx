import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useRoute } from '@react-navigation/native';

import { Text, View } from '../components/Themed';
import ToDoItem from '../components/ToDoItem';

const GET_PROJECT = gql`
query getTaskList($id: ID!){
  getTaskList(id: $id){
    id
    title
    createdAt
    todos {
      id
      content
      isCompleted
    }
  }
}`;


const CREATE_TODO = gql`
mutation createToDo($taskListId: ID!, $content: String!){
  createToDo(taskListId: $taskListId, content: $content){
    id
    content
    isCompleted
    taskList {
      id
      progress      
      todos {
        id
        content
        isCompleted
      }
    }    
  }
}`;


const DELETE_TODO = gql`
mutation deleteToDo($id: ID!){
  deleteToDo(id: $id)
}
`;

export default function ToDoScreen() {
  
  const route = useRoute();
  const id = route.params.id;
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState('');
  const { data, error, loading } = useQuery(GET_PROJECT, { variables: { id }});
  const [
    createToDo, { data: createTodoData, error: createTodoError } 
  ]= useMutation(CREATE_TODO, { refetchQueries: GET_PROJECT });

  const [ deleteToDo, { data: deleteTodoData, error: deleteTodoError }  ]= useMutation(DELETE_TODO, { refetchQueries: GET_PROJECT });


  
  useEffect(() => {
    if(error){
      Alert.alert('Error fetching project', error.message);
    }    
  },[error]);

  useEffect(() => {
    if(data){
      setProject(data.getTaskList);
      setTitle(data.getTaskList.title);
    }
  },[data]);


  

  const createNewItem = (atIndex: number) => {
    createToDo({ 
      variables: { 
        content: '',
        taskListId: id
      }
    });
    // const newTodos = [...todos];
    // newTodos.splice(atIndex, 0, {
    //   id: Math.random().toString(),
    //   content: '',
    //   isCompleted: false
    // })
    // setTodos(newTodos);
  }

  const handleDeleteTodo = async ( id : any) => {
    deleteToDo({
      variables: {
        id
      }
    });
  }


  if(!project){
    return null;
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
          data={project.todos}
          renderItem={({ item, index }) => ( 
            <ToDoItem 
              todo={item} 
              onSubmit={() => createNewItem(index + 1)}                
              handleDeleteTodo = {() => handleDeleteTodo(item.id)}
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
