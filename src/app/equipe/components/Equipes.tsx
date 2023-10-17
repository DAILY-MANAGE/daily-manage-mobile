import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import CardComponent from "./Card";
import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getToken } from "../../(auth)";
import { DadosEquipe } from "..";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default function CardEquipes() {
  const [data, setData] = useState<DadosEquipe[]>([])

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(`/equipe/todas/criadas`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`
          },
        },);
        setData(response.data);
      } catch (error) { }
    })();
  }, []);

  return (
  <>
    {data.map((data: DadosEquipe) => (
      <CardComponent key={data.id} title={data.nome} />
    ))}
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "auto",
    width: "100%",
    gap: 4,
  },
});
