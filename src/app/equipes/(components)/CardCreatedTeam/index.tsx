import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BASEURL, VER_EQUIPES_CRIADAS } from "../../../../utils/endpoints";
import { DadosEquipe } from "../../../../interfaces/DadosEquipe";
import { getToken } from "../../../../hooks/token";
import { IdStorage } from "../../../../hooks/useId";
import { useRouter } from "expo-router";
import { axiosInstance } from "../../../../utils/useAxios";

export function CardCreatedTeam({ search }: { search: string }) {
  const [data, setData] = useState<DadosEquipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const i = axiosInstance;

  async function getCreatedTeams() {
    const token = await getToken();

    setIsLoading(true);

    try {
      const res = await i.get(`${BASEURL}${VER_EQUIPES_CRIADAS}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {},
      });

      setTimeout(() => {
        setIsLoading(false);
      }, 2000)
      if (res.status === 200) {
        setData(res.data.content);
      } else {
        return Promise.reject()
      }
    } catch (err) {
      setIsLoading(false);
      return Promise.reject()
    }
    return Promise.resolve()
  }

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => await getCreatedTeams();
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [BASEURL, VER_EQUIPES_CRIADAS, i]);

  const filteredTeams = data.filter((team) =>
    search ? team.nome.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <>
      {isLoading && (<Text>Buscando equipes...</Text>)}
      {
      filteredTeams.length === 0 ? (
        <Text>Nenhuma equipe foi encontrada...</Text>
      ) : (
        filteredTeams &&
        filteredTeams.map((team: DadosEquipe) => (
          <Pressable
            key={team.id}
            style={styles.equipeContainer}
            onPress={() => {
              IdStorage.setId(team.id as any);
              router.push({
                pathname: `/equipe/(tabs)/${team.id as any}`,
                params: { id: `${team.id as any}` },
              });
            }}
          >
            <View key={team.id} style={styles.container}>
              <Text style={styles.title}>{team.nome}</Text>
              <Text style={styles.subitle}>Identificação: {team.id}</Text>
            </View>
          </Pressable>
        ))
      )}
    </>
  );
}

const styles = StyleSheet.create({
  equipeContainer: {
    paddingTop: 10,
    height: "auto",
    width: "100%",
    shadowColor: "#c5c5c5",
    elevation: 8,
  },
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
  subitle: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#666564",
  },
});
