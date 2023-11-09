import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text } from "react-native";
import { useEffect } from "react";

export default function ResponderFormulario() {
  const getPerguntas = async (): Promise<string[] | null> => {
    try {
      const pergunta = await AsyncStorage.getItem("perguntas");
      if (pergunta !== null) {
        return JSON.parse(pergunta);
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  return (
    <>
      <View><Text>aaa</Text></View>
    </>
  );
}
