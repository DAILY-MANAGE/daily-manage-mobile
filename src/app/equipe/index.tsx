import { View, StyleSheet, ScrollView } from "react-native";
import OverlayComponent from "./components/Overlay";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import CardEquipes from "./components/Equipes";
import { getToken } from "../auth/login";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export interface DadosEquipe {
  id?: number
  nome?: string
}

export default function Equipes({ id, nome }: DadosEquipe) {
  const [nomeEquipe, setNomeEquipe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DadosEquipe[]>([])

  const criarEquipe = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`${baseURL}/equipe/criar`, {
        nome: nomeEquipe,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`
        },
        data: {}
      }
      );
      if (response.status === 201) {
        console.log(`Equipe criada: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setData(response.data)
      } else {
        throw new Error(
          `Erro ao criar a equipe: ${JSON.stringify(response.data)}`
        );
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <OverlayComponent
          value={nomeEquipe}
          setValue={setNomeEquipe}
          onPress={criarEquipe}
          editable={!isLoading}
        />
        <CardEquipes />
      </View> 
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    margin: 0,
    padding: 0,
  },
  container: {
    gap: 8,
    height: "100%",
    width: "100%",
    padding: 16,
    flexDirection: "column",
    margin: 0,
  },
  equipes: {
    gap: 8
  }
});
