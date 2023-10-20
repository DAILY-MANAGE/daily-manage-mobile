import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { View, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getToken } from "../../(auth)";
import { DadosFormularios, getParamId } from "../[id]";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export function CardFormulario() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DadosFormularios[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `${baseURL}/equipe/forms/todos?equipeid=${await getParamId()}`,
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
      {data.map((data: DadosFormularios) => (
        <View key={data.id} style={styles.formulario}>
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
  formulario: {
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
