import { StyleSheet, ScrollView, Pressable } from "react-native";
import OverlayComponent from "./components/Overlay";
import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import { CardEquipes } from "./components/Equipes";
import { getToken } from "../(auth)";
import { useRouter } from "expo-router";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export interface DadosEquipe {
  id?: number;
  nome?: string;
}

export default function Equipes() {
  const [nomeEquipe, setNomeEquipe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DadosEquipe[]>([]);
  const [id, setId] = useState(null);

  const router = useRouter();

  const refresh = async () => {
    return router.replace("equipe");
  };

  const criarEquipe = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `${baseURL}/equipe/criar`,
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
        setIsLoading(false);
        setData(response.data);
        setId(response.data.id);
        await refresh();
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
      <ScrollView style={styles.container}>
        <OverlayComponent
          value={nomeEquipe}
          setValue={setNomeEquipe}
          onPress={() => {
            criarEquipe();
          }}
          editable={!isLoading}
        />
        <Pressable
          onPress={() =>
            router.push({
              pathname: `/paginaEquipe/[${id}]`,
              params: { id: `${id}` },
            })
          }
          style={styles.equipeContainer}
        >
          <CardEquipes />
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  equipeContainer: {
    paddingTop: 8,
    height: "auto",
    width: "100%",
    gap: 8,
  },
  container: {
    gap: 8,
    height: "100%",
    width: "100%",
    padding: 16,
    flexDirection: "column",
    margin: 0,
  },
});
