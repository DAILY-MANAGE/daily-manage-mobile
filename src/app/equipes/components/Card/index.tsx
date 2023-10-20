import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { baseURL, getEquipesTodas } from "../../../../utils/endpoints";
import { DadosEquipe } from "../../../../interfaces/DadosEquipe";
import { getToken } from "../../../../hooks/token";
import axios from "axios";

export function CardEquipe() {
  const [data, setData] = useState<DadosEquipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: baseURL,
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `${baseURL}/${getEquipesTodas}`,
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
      {data.map((data: DadosEquipe) => (
        <View key={data.id} style={styles.container}>
          <Text style={styles.title}>{data.nome}</Text>
          <Text style={styles.subitle}>Identificação: {data.id}</Text>
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
  subitle: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#666564",
  }
});
