import React, { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { BASEURL, VER_EQUIPES_CRIADAS } from "../../../../utils/endpoints"
import { DadosEquipe } from "../../../../interfaces/DadosEquipe"
import { getToken } from "../../../../hooks/token"
import { IdStorage } from "../../../../hooks/useId"
import { useRouter } from "expo-router"
import { axiosInstance } from "../../../../utils/useAxios"
import { LinearProgress } from "@rneui/themed"
import { saveColor } from "../../../../utils/constants"

export function CardCreatedTeam({ search }: { search: string }) {
  const [data, setData] = useState<DadosEquipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0);

  const router = useRouter()

  const i = axiosInstance

  async function getCreatedTeams() {
    const token = await getToken()

    setIsLoading(true)

    try {
      const res = await i.get(`${BASEURL}${VER_EQUIPES_CRIADAS}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {},
      })
      if (res.status === 200) {
        const updatedData = res.data.content
        setData(updatedData)
        setIsLoading(false)
      } else {
        throw new Error(`${JSON.stringify(res.data)}`)
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  const filteredTeams = data.filter((team) =>
    search ? team.nome.toLowerCase().includes(search.toLowerCase()) : true
  )

  useEffect(() => {
    getCreatedTeams()
  }, []) // precisa arrumar isso

  React.useEffect(() => {
    let subs = true;
    if (progress < 1 && progress !== 0) {
      setTimeout(() => {
        if (subs) {
          setProgress(progress + 0.1);
        }
      }, 100);
    }
    return () => {
      subs = false;
    };
  }, [progress]);

  return (
    <>
      {isLoading ?
        (
          <>
            <Text style={{ fontSize: 16, color: "#606060", padding: 8 }}>
              Buscando equipes...
            </Text>
            <LinearProgress style={{ marginVertical: 8 }} color={saveColor}/>
          </>
        ) :
        filteredTeams && filteredTeams.length === 0 ? (
          <Text style={{ fontSize: 16, color: "#606060", padding: 8 }}>Nenhuma equipe foi encontrada.</Text>
        ) :
          filteredTeams &&
          filteredTeams.map((team: DadosEquipe) => (
            <Pressable
              key={team.id}
              style={styles.equipeContainer}
              onPress={() => {
                IdStorage.setId(team.id as any)
                router.push({
                  pathname: `/equipe/(tabs)/${team.id as any}`,
                  params: { equipeid: team.id as any }
                })
              }}
            >
              <View key={team.id} style={styles.container}>
                <Text style={styles.title}>{team.nome}</Text>
                <Text style={styles.subitle}>Identificação: {team.id}</Text>
              </View>
            </Pressable>
          ))
      }
    </>
  )
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
})
