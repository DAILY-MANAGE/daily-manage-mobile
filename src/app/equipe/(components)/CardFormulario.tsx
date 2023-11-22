import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BASEURL, VER_FORMULARIOS_DA_EQUIPE } from "../../../utils/endpoints";
import { FormData } from "../../../interfaces/DadosFormulario";
import { getToken } from "../../../hooks/token";
import { getEquipeId } from "../../equipes/(tabs)";
import { axiosInstance } from "../../../utils/useAxios";

export function CardFormulario({ search }: { search: string }) {
  const [data, setData] = useState<FormData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const i = axiosInstance;

  async function getForms() {
    setIsLoading(true);

    try {
      const token = await getToken();

      const equipeid = await getEquipeId();

      const res = await i.get(`${BASEURL}${VER_FORMULARIOS_DA_EQUIPE}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Equipe: equipeid as number,
        },
        data: {},
      });

      if (res.status === 200) {
        setData(res.data.content);
        setIsLoading(false);
      } else {
        throw new Error(`${JSON.stringify(res.data)}`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getForms();
    setIsLoading(false);
  }, [data]);

  const filteredForms = data.filter((form) =>
    search ? form.nome.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <>
      {isLoading ? (
        <Text>Buscando formulários da equipe...</Text>
      ) : filteredForms.length === 0 ? (
        <Text>Nenhum formulário foi encontrado...</Text>
      ) : (
        filteredForms &&
        filteredForms.map((form: FormData) => (
          <View key={form.id} style={styles.container}>
            <Text style={styles.title}>{form.nome}</Text>
            <Text style={styles.subtitle}>Identificação: {form.id}</Text>
          </View>
        ))
      )}
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
    borderColor: "#c5c5c5",
    shadowColor: "#c5c5c5",
    elevation: 8,
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
