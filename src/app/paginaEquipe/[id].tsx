import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Equipe() {
 return(
  <View style={styles.container}>
   <Text>Em progresso...</Text>
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