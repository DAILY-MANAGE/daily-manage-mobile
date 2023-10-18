import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import CardComponent from "./Card";
import { View, StyleSheet, Text } from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import { getToken } from "../../(auth)";
import { DadosEquipe } from "..";
import { Link } from "expo-router";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export function CardEquipes() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DadosEquipe[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `${baseURL}/equipe/todas/criadas`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await getToken()}`,
            },
            data: {},
          }
        );
        if (response.status === 200) {
          console.log(`${JSON.stringify(response.data.content)}`);
          setData(response.data.content);
          setIsLoading(false);
        } else {
          throw new Error(`Erro ao buscar ${JSON.stringify(response.data)}`);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);
  
  return (
    <>
      {data.map((data: DadosEquipe) => (
        <View key={data.id} style={styles.equipe}>
          <Text style={styles.text}>{data.nome}</Text>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  equipe: {
    height: "auto",
    width: "100%",
    padding: 24,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "black",
  },
});
