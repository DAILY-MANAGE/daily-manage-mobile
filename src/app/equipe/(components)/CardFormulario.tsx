import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { ENDPOINT, VER_FORMULARIOS_DA_EQUIPE } from "../../../utils/endpoints";
import { DadosFormulario } from "../../../interfaces/DadosFormulario";
import { getToken } from "../../../hooks/token";
import axios from "axios";
import { getEquipeData } from "../../equipes";
import { useRouter } from "expo-router";
import { IdStorage } from "../../../hooks/useId";

export function CardFormulario() {
  const [data, setData] = useState<DadosFormulario[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const axiosInstance = axios.create({
    baseURL: ENDPOINT,
  });

  const equipeData = async () => {
    return await getEquipeData();
  };

  async function fetchData() {
    setIsLoading(true);
    try {
      const token = await getToken();
      const response = await axiosInstance.get(
        `${ENDPOINT}${VER_FORMULARIOS_DA_EQUIPE}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Equipe: (await equipeData()) as number,
          },
          data: {},
        }
      );
      if (response.status === 200) {
        setData(response.data.content);
        setIsLoading(false);
      } else {
        throw new Error(`${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data && data.map((data: DadosFormulario) => (
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
  },
  equipeContainer: {
    paddingTop: 8,
    height: "auto",
    width: "100%",
    gap: 8,
  },
});
