import {
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
  ToastAndroid,
  TouchableOpacity,
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
import SearchBar from "../components/SearchBar";

export const getEquipeData = async () => {
  return await IdStorage.getId();
};

export default function Equipes() {
  const [nomeEquipe, setNomeEquipe] = useState<string | null>(null);
  const [data, setData] = useState<DadosEquipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      router.replace("equipes");
    }, 500);
  }, []);

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
        ToastAndroid.show(`Equipe ${nomeEquipe} criada!`, ToastAndroid.SHORT);
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
    <>
      <SearchBar />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <OverlayEquipe
          value={nomeEquipe}
          setValue={setNomeEquipe}
          onPress={criarEquipe}
          editable={!isLoading}
        />
        <CardEquipe />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    bottom: 0,
    width: "100%",
    height: "auto",
    position: "absolute",
  },
  container: {
    height: "100%",
    width: "100%",
    padding: 16,
    flexDirection: "column",
    margin: 0,
    backgroundColor: "white"
  },
  equipeContainer: {
    paddingTop: 8,
    height: "auto",
    width: "100%",
    gap: 8,
  },
});
