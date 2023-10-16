import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { EquipeData } from "..";
import CardComponent from "./Card";
import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkYWlseS1tYW5hZ2UiLCJzdWIiOiJhZG1pbiIsImV4cCI6MTY5NzUwOTI5NX0.ZkmzEdzBdFKHBpXQN0TFw2VLpHx3qlrvRgXMXh9vEa0",
  },
  data: {},
});

export default function CardEquipes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(`/equipe/todos/criadas`);
        setData(response.data);
      } catch (error) {}
    })();
  }, []);

  return (
    <View style={styles.container}>
      {data &&
        data.map((data: EquipeData) => (
          <CardComponent key={data.id} title={data.nome} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "auto",
    width: "100%",
    gap: 16,
  },
});
