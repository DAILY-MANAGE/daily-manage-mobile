import {
  StyleSheet,
  ScrollView,
  Pressable
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import { ENDPOINT, CRIAR_EQUIPE } from "../../utils/endpoints";
import { CardEquipe } from "./components/Card";
import { getToken } from "../../hooks/token";
import { DadosEquipe } from "../../interfaces/DadosEquipe";
import OverlayEquipe from "./components/Overlay";
import { IdStorage } from "../../hooks/useId";

export const getEquipeData = async () => {
  return await IdStorage.getId()
};

export default function Equipes() {
  const [nomeEquipe, setNomeEquipe] = useState<string | null>(null);
  const [data, setData] = useState<DadosEquipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const axiosInstance = axios.create({
    baseURL: ENDPOINT,
  });

  const criarEquipe = async () => {
    const token = await getToken();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `${ENDPOINT}${CRIAR_EQUIPE}`,
        {
          nome: nomeEquipe,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {},
        }
      );
      if (response.status === 201) {
        console.log(`${JSON.stringify(response.data)}`);
        setData(response.data);
        IdStorage.setId(response.data.id);
        setIsLoading(false);
        setNomeEquipe("");
      } else {
        throw new Error(`${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getInnerEquipeId = async () => {
    return await getEquipeData()
  }

  return (
      <ScrollView style={styles.container}>
        <OverlayEquipe
          value={nomeEquipe}
          setValue={setNomeEquipe}
          onPress={criarEquipe}
          editable={!isLoading}
        />
        <Pressable
          onPress={async () =>
            router.push({
              pathname: `/equipe/(tabs)/${(await getInnerEquipeId()).id}}`,
              params: { id: `${(await getInnerEquipeId()).id}` },
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
