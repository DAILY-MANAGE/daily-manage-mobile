import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { baseURL, getFormulariosTodos } from "../../../utils/endpoints";
import { DadosFormulario } from "../../../interfaces/DadosFormulario";
import { getToken } from "../../../hooks/token";
import axios from "axios";

export function CardFormulario() {
  const [data, setData] = useState<DadosFormulario[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const param = useGlobalSearchParams();

  const axiosInstance = axios.create({
    baseURL: baseURL,
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      console.log(param.id)
      try {
        const response = await axiosInstance.get(
          `${baseURL}/${getFormulariosTodos}?equipeid=${param.id}`,
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
          throw new Error(`${JSON.stringify(response.data)}`);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {data.map((data: DadosFormulario) => (
        <View key={data.id} style={styles.container}>
          <Text style={styles.title}>{data.nome}</Text>
          <Text style={styles.subtitle}>Identificação: {data.id}</Text>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    width: "100%",
    padding: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#666564",
  }
});
