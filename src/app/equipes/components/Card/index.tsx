import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { ENDPOINT, VER_EQUIPES_CRIADAS } from "../../../../utils/endpoints";
import { DadosEquipe } from "../../../../interfaces/DadosEquipe";
import { getToken } from "../../../../hooks/token";
import axios from "axios";

interface CardEquipeProps {
  style?: any;
  onPress?: any;
}

interface CardEquipeItemProps {
  data: DadosEquipe;
  onLongPress: () => void;
}

export function CardEquipe({ style, onPress }: CardEquipeProps) {
  const [data, setData] = useState<DadosEquipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DadosEquipe | null>(null);

  const axiosInstance = axios.create({
    baseURL: ENDPOINT,
  });

  async function fetchData() {
    const token = await getToken();
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `${ENDPOINT}${VER_EQUIPES_CRIADAS}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

  function handleSelectItem(item: DadosEquipe) {
    setSelectedItem(item);
  }

  function CardEquipeItem({ data, onLongPress }: CardEquipeItemProps) {
    return (
      <Pressable onLongPress={onLongPress}>
        <Text style={styles.title}>{data.nome}</Text>
        <Text style={styles.subitle}>Identificação: {data.id}</Text>
      </Pressable>
    );
  }

  return (
    <>
      {data.map((data: DadosEquipe) => (
        <Pressable
          key={data.id}
          style={[
            style ? style : styles.container,
            selectedItem === data && styles.selected,
          ]}
          onPress={onPress}
        >
          <CardEquipeItem data={data} onLongPress={() => handleSelectItem(data)} />
        </Pressable>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    width: "100%",
    padding: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
  },
  subitle: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#666564",
  },
  selected: {
    backgroundColor: "#B0D1ED",
  },
});
