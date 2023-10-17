import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Equipe() {
 const { id } = useLocalSearchParams();
 return(
  <View style={styles.container}>
   <Text>Equipe {id}</Text>
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  height: "100%",
  width: "100%",
  padding: 8,
  flexDirection: "column"
 }
});