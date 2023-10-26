import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ENDPOINT, VER_FORMULARIOS_DA_EQUIPE } from "../../../utils/endpoints";
import { DadosFormulario } from "../../../interfaces/DadosFormulario";
import { getToken } from "../../../hooks/token";
import axios from "axios";

export function CardFormulario() {
  const [data, setData] = useState<DadosFormulario[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [equipeData, setEquipeData] = useState(null);

  const axiosInstance = axios.create({
    baseURL: ENDPOINT,
  });

  /* useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const equipeData = await getEquipeData()
        const token = await getToken()
        const response = await axiosInstance.get(
          `${ENDPOINT}${VER_FORMULARIOS_DA_EQUIPE}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              Equipe: equipeData as number,
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
        console.log(`Formulários criados: ${data}`)
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []); */

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
            Equipe: equipeData as number,
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
      console.log(`Formulários criados: ${data}`);
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [equipeData]);

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
