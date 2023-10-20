import {
  StyleSheet,
  ScrollView,
  Pressable
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import { baseURL, postEquipe } from "../../utils/endpoints";
import { CardEquipe } from "./components/Card";
import { getToken } from "../../hooks/token";
import { DadosEquipe } from "../../interfaces/DadosEquipe";
import OverlayEquipe from "./components/Overlay";
import * as Updates from 'expo-updates';

export default function Equipes() {
  const [nomeEquipe, setNomeEquipe] = useState<string | null>(null);
  const [data, setData] = useState<DadosEquipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  const router = useRouter();

  const refresh = async () => {
    return Updates.reloadAsync()
  };

  const axiosInstance = axios.create({
    baseURL: baseURL,
  });

  const criarEquipe = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `${baseURL}/${postEquipe}`,
        {
          nome: nomeEquipe,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          data: {},
        }
      );
      if (response.status === 201) {
        console.log(`${JSON.stringify(response.data)}`);
        setId(response.data.id);
        setData(response.data);
        setIsLoading(false);
        console.log(id)
        setNomeEquipe("");
      } else {
        throw new Error(`${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
      <ScrollView style={styles.container}>
        <OverlayEquipe
          value={nomeEquipe}
          setValue={setNomeEquipe}
          onPress={criarEquipe}
          editable={!isLoading}
        />
        <Pressable
          onPress={() =>
            router.push({
              pathname: `/equipe/(tabs)/${id}`,
              params: { id: `${id}` },
            })
          }
          style={styles.equipeContainer}
        >
          <CardEquipe />
        </Pressable>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    height: "100%",
    width: "100%",
    padding: 16,
    flexDirection: "column",
    margin: 0,
  },
  equipeContainer: {
    paddingTop: 8,
    height: "auto",
    width: "100%",
    gap: 8,
  },
});
