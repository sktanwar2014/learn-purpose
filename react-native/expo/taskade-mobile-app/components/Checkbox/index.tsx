import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

interface CheckboxProps {
  isChecked: boolean,
  onPress: () => void
}

const Checkbox = (props: CheckboxProps) => {
  const { onPress, isChecked } = props;  
  const name = isChecked ? "checkbox-marked-outline" : "checkbox-blank-outline";

  return (
    <Pressable onPress={onPress}>
        <MaterialCommunityIcons name={name} size={24} color="white" />
    </Pressable>
  )
}

export default Checkbox;