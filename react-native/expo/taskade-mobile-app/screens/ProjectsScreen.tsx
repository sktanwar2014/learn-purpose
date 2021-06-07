import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import ProjectItem from '../components/ProjectItem';

import { Text, View } from '../components/Themed';


const MY_PROJECTS = gql`
query myTaskList {
  myTaskList {
    id
    createdAt
    title   
  }
}
`;


export default function ProjectsScreen() {
  const [projects, setProjects] = useState([]);
  const { data, error, loading } = useQuery(MY_PROJECTS);

  useEffect(() => {
    if(error){
      Alert.alert('Error in data fetching');
    }    
  },[error]);

  useEffect(() => {
    if(data){
      setProjects(data.myTaskList);
    }
  },[data]);

  

  return (
    <View style={styles.container}>
      <FlatList 
        data={projects}
        renderItem = {({item, index }) => <ProjectItem project={item} /> }
        style={{width: '100%'}}
      />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
