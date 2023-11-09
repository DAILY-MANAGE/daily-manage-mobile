import { ListItem } from "@rneui/themed";
import axios from "axios";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import { getToken } from "../../../../hooks/token";
import {
  ENDPOINT,
  FILTRAR_USUARIOS_DA_EQUIPE,
} from "../../../../utils/endpoints";
import { getEquipeData } from "../../../equipes";

export interface PresetPermittedUsers {
  id?: any;
  nome?: string;
  usuario?: string;
  email?: string;
}

export const setIdUsuariosPermitidos = async (data: number[]) => {
  if (data) {
    try {
      await AsyncStorage.setItem("idusuariospermitidos", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }
};

const equipeData = async () => {
  return await getEquipeData();
};

export default function AccordionPessoas() {
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<PresetPermittedUsers[]>([]);
  const [usuariosPermitidos, setUsuariosPermitidos] = useState<number[]>([]);
  const [nomeUsuariosPermitidos, setNomeUsuariosPermitidos] = useState("");

  const axiosInstance = axios.create({
    baseURL: ENDPOINT,
  });

  const getUsuariosEquipe = async () => {
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
        setIdUsuariosPermitidos(usuariosPermitidos);
        setData(response.data.content);
        setIsLoading(false);
      } else {
        throw new Error(`${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  
  return (
    <ListItem.Accordion
      containerStyle={styles.accordion__container}
      content={
        <ListItem.Content>
            <ListItem.Title style={styles.accordion__title}>
              Usuários permitidos
            </ListItem.Title>
        </ListItem.Content>
      }
      isExpanded={expanded}
      onPress={() => {
        getUsuariosEquipe();
        setExpanded(!expanded);
        console.log(usuariosPermitidos)
      }}
    >
      {data.map((data: PresetPermittedUsers) => (
        <ListItem
          style={styles.list}
          key={data.id}
          onPress={() => {
            setUsuariosPermitidos((state: number[]) => {
              if (state.includes(data.id)) {
                const aux = state.filter((id: number) => id !== data.id)
                return aux
              }
              return [...state, data.id]
            });
            setNomeUsuariosPermitidos(data.usuario);
          }}
          bottomDivider
        >
          <ListItem.Content>
            <ListItem.Title>{data.usuario}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </ListItem.Accordion>
  );
}

const styles = StyleSheet.create({
  accordion__container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f3f6f4",
    borderRadius: 8
  },
  accordion__title: {
    fontSize: 16,
    fontWeight: "500",
  },
  list: {
    width: "60%",
  },
});
