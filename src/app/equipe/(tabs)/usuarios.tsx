import axios from "axios";
import { Text, View, StyleSheet } from "react-native";
import { ENDPOINT, FILTRAR_USUARIOS_DA_EQUIPE } from "../../../utils/endpoints";
import { DadosFormulario } from "../../../interfaces/DadosFormulario";
import { useEffect, useState } from "react";
import { getEquipeData } from "../../equipes";
import { getToken } from "../../../hooks/token";
import { Icon } from "@rneui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export interface DadosUsuario {
  id?: number;
  usuario?: string;
  nome?: string;
}

export default function Usuarios() {
  const [data, setData] = useState<DadosUsuario[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: ENDPOINT,
  });

  const equipeData = async () => {
    return await getEquipeData();
  };

  async function fetchData() {
    setIsLoading(true);
    try {
      const token = await getToken();
      const response = await axiosInstance.get(
        `${ENDPOINT}${FILTRAR_USUARIOS_DA_EQUIPE}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Equipe: (await equipeData()) as number,
          },
          data: {},
        }
      );
      if (response.status === 200) {
        setData(response.data.content);
        setIsLoading(false);
      } else {
        throw new Error(`${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data.map((data: DadosUsuario) => (
        <View key={data.id} style={styles.container}>
          <View style={{ padding: 8 }}>
            <Text style={{ fontSize: 16, color: "#555555", fontWeight: "600" }}>Membros da equipe:</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.imgContainer}>
              <FontAwesome name="user-circle-o" size={48} color="#ccc" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{data.nome}</Text>
              <Text style={styles.subtitle}>Vulgo: {data.usuario}</Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "column",
  },
  imgContainer: {
    height: "auto",
    width: "auto",
    backgroundColor: "#fcfcfc",
    borderRadius: 25,
  },
  container: {
    height: "100%",
    width: "100%",
    padding: 8,
    backgroundColor: "white"
  },
  card: {
    height: "auto",
    width: "100%",
    padding: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#c5c5c5",
    flexDirection: "row",
    gap: 16,
    shadowColor: "#c5c5c5",
    elevation: 8
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#666564",
  },
});
