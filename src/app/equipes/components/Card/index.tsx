import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ENDPOINT, VER_EQUIPES_CRIADAS } from "../../../../utils/endpoints";
import { DadosEquipe } from "../../../../interfaces/DadosEquipe";
import { getToken } from "../../../../hooks/token";
import axios from "axios";
import { IdStorage } from "../../../../hooks/useId";
import { useRouter } from 'expo-router';

export function CardEquipe() {
  const [data, setData] = useState<DadosEquipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()

  const axiosInstance = axios.create({
    baseURL: ENDPOINT,
  });

  async function fetchData() {
    const token = await getToken();
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `${ENDPOINT}${VER_EQUIPES_CRIADAS}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      console.log(data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data && data.map((data: DadosEquipe) => (
        <Pressable
          key={data.id}
          style={styles.equipeContainer}
          onPress={() => {
            IdStorage.setId(data.id as any);
            router.push({
              pathname: `/equipe/(tabs)/${data.id as any}`,
              params: { id: `${data.id as any}` },
            });
          }}
        >
          <View key={data.id} style={styles.container}>
            <Text style={styles.title}>{data.nome}</Text>
            <Text style={styles.subitle}>Identificação: {data.id}</Text>
          </View>
        </Pressable>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  equipeContainer: {
    paddingTop: 10,
    height: "auto",
    width: "100%",
  },
  container: {
    height: "auto",
    width: "100%",
    padding: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#c5c5c5",
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
  },
  subitle: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#666564",
  },
});
