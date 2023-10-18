import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import CardComponent from "./Card";
import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { getToken } from "../../auth/login";
import { DadosEquipe } from "..";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default function CardEquipes() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<DadosEquipe[]>([])

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      try {
        const response = await axiosInstance.get(`${baseURL}/equipe/todas/criadas`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkYWlseS1tYW5hZ2UiLCJzdWIiOiJtYXN0ZXIiLCJleHAiOjE2OTc2MjU5OTh9.gz9kVRm-_GfuPQzroy-VLoe9PCI95FZIrUjMUCV4ZMk`
          },
          data: {}
        })
        if (response.status === 200) {
          console.log(`${JSON.stringify(response.data.content)}`)
          setData(response.data.content);
          setIsLoading(false)
        } else {
          throw new Error(`Erro ao buscar ${JSON.stringify(response.data)}`)
        }
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    })();
  }, []);

  return (
    <>
      {data.map((data: DadosEquipe) => (
        <CardComponent key={data.id} nome={data.nome}/>
      ))}
    </>
  );
}