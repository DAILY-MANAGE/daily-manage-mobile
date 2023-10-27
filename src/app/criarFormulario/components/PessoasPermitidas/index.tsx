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
  id: number | undefined;
  nome?: string;
  usuario?: string;
  email?: string;
}

const equipeData = async () => {
  return await getEquipeData();
};

export const setIdUsuariosPermitidos = async (data: PresetPermittedUsers) => {
  try {
    await AsyncStorage.setItem("id", JSON.stringify(data.id));
  } catch (error) {
    console.log(error);
  }
};

export default function AccordionPessoas() {
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<PresetPermittedUsers[]>([]);
  const [usuarioPermitido, setUsuarioPermitido] = useState(null);
  const [nomeUsuarioPermitido, setNomeUsuarioPermitido] = useState("");

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
        setIdUsuariosPermitidos(response.data.id);
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
          {usuarioPermitido && usuarioPermitido === null ? (
            <ListItem.Title style={styles.accordion__title}>
              Usuários permitidos
            </ListItem.Title>
          ) : (
            <ListItem.Title style={styles.accordion__title}>
              {nomeUsuarioPermitido}
            </ListItem.Title>
          )}
        </ListItem.Content>
      }
      isExpanded={expanded}
      onPress={() => {
        getUsuariosEquipe();
        setExpanded(!expanded);
      }}
    >
      {data.map((data: PresetPermittedUsers) => (
        <ListItem
          style={styles.list}
          key={data.id}
          onPress={() => {
            console.log(data.usuario);
            setUsuarioPermitido(data.id);
            setNomeUsuarioPermitido(data.usuario);
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
    paddingLeft: 0,
    paddingRight: 0,
  },
  accordion__title: {
    fontSize: 20,
    fontWeight: "700",
  },
  list: {
    width: "60%",
  },
});
