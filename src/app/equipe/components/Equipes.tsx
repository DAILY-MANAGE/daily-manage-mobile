import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { View, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getToken } from "../../(auth)";
import { DadosEquipe } from "..";

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
          <Text style={styles.textIdentificação}>Identificação: {data.id}</Text>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "900",
  },
  equipe: {
    height: "auto",
    width: "100%",
    padding: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "black",
  },
  textIdentificação: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#666564",
  }
});
