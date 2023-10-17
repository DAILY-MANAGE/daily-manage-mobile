import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import OverlayComponent from "./components/Overlay";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import CardEquipes from "./components/Equipes";

export interface EquipeData {
  id: number;
  nome: string;
}

const token = () => {
  return localStorage.getItem("token");
};

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      `Bearer ${token}`,
  },
});

export default function Equipes() {
  const [nomeEquipe, setNomeEquipe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const criarEquipe = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`${baseURL}/equipe/create`, {
        nome: nomeEquipe,
      });
      if (response.status === 201) {
        console.log(`Equipe criada: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
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
    <View style={styles.container}>
      <OverlayComponent
        value={nomeEquipe}
        setValue={setNomeEquipe}
        onPress={criarEquipe}
        editable={!isLoading}
      />
      <View style={styles.cards}>
        <CardEquipes />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 16,
    width: "100%",
    height: "auto",
  },
  container: {
    height: "100%",
    width: "100%",
    padding: 16,
    flexDirection: "column",
    gap: 16,
  },
});
