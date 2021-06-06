import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Text, View } from '../Themed';
import styles from './styles';
import { Pressable } from 'react-native';

interface ProjectItemProps {
  project: {
    id: string;
    title: string;
    createdAt: string;
  }
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('ToDoScreen', {id: project.id});
  }

  return (
    <Pressable style={styles.root} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="file-outline" size={24} color={"gray"} />
      </View>
      <View style={{ flexDirection: 'row', alignItems:'center' }}>
        <Text style={styles.title}> {project.title} </Text>
        <Text style={styles.time}> {project.createdAt} </Text>
      </View>      
    </Pressable>      
  );
}

export default ProjectItem;