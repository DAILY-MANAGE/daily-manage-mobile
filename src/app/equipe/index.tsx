import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import CardComponent from "./components/Card";
import OverlayComponent from "./components/Overlay";
import { useState } from "react";
import axios from "axios";
interface EquipeData {
  id: number;
  nome: string;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: { "Content-Type": "application/json", },
});

export default function Equipes({ id, nome }: EquipeData) {
  const[equipe, setEquipe] = useState<EquipeData[]>([]);
  const [nomeEquipe, setNomeEquipe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const criarEquipe = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.post(`${URL}/equipe/create`, {
        id: id,
        nomeEquipe: nome
      });
      if (response.status === 201) {
        console.log(`Equipe criada: ${JSON.stringify(response.data)}`);
        setEquipe(response.data)
        setIsLoading(false);
      } else {
        throw new Error(`Erro ao criar a equipe: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      alert("Ocorreu um erro inesperado!");
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <OverlayComponent
        value={nomeEquipe}
        setValue={setNomeEquipe}
        onPress={criarEquipe}
        editable={!isLoading}
      />
      <Link
        style={styles.cards}
        href={{
          pathname: "http://localhost:8080/equipe/[id]/",
          params: { id: id },
        }}
      >
        {equipe.map((equipe) => (
          <CardComponent key={equipe.id} title={equipe.nome} />
        ))}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 16,
  },
  container: {
    height: "100%",
    width: "100%",
    padding: 16,
    flexDirection: "column",
    gap: 16,
  },
});
