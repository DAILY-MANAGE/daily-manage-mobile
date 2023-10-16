import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function Equipe() {
 const { id } = useLocalSearchParams();
 return(
  <Text>Equipe: { id }</Text>
 );
}