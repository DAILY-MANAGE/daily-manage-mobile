import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  ToastAndroid,
} from "react-native"
import React, { useState } from "react"
import { useRouter } from "expo-router"
import { BASEURL, CRIAR_EQUIPE } from "../../../utils/endpoints"
import { CardCreatedTeam } from "../(components)/CardCreatedTeam"
import { getToken } from "../../../hooks/token"
import { DadosEquipe } from "../../../interfaces/DadosEquipe"
import OverlayEquipe from "../(components)/Overlay"
import { IdStorage } from "../../../hooks/useId"
import SearchBar from "../../components/SearchBar"
import { axiosInstance } from "../../../utils/useAxios"
import { saveColor } from "../../../utils/constants"

export default function Equipes() {
  const [nomeEquipe, setNomeEquipe] = useState<string | null>(null)
  const [data, setData] = useState<DadosEquipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [search, setSearch] = useState('')
  const [updateTeamsData, setUpdateTeamsData] = useState(false)

  const handleUpdateTeamsData = () => {
    setUpdateTeamsData(!updateTeamsData)
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      router.replace("equipes")
    }, 500)
  }, [])

  const router = useRouter()

  const handleSearch = (text: string) => {
    setSearch(text)
  }

  const i = axiosInstance

  const createTeam = async () => {

    const token = await getToken()

    setIsLoading(true)

    try {
      const res = await i.post(
        `${BASEURL}${CRIAR_EQUIPE}`,
        {
          nome: nomeEquipe,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {},
        }
      )

      if (res.status === 201) {
        setData(res.data)
        IdStorage.setId(res.data.id)
        setIsLoading(false)
        ToastAndroid.show(`Equipe ${nomeEquipe} criada!`,
          ToastAndroid.SHORT)
        setNomeEquipe("")
        handleUpdateTeamsData()
      } else {
        throw new Error(`${JSON.stringify(res.data)}`)
      }

    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  return (
    <>
      <SearchBar showLoading={search ? true : false} placeholder="Pesquisar equipes" value={search} onChangeText={handleSearch} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={"#262626"}
            colors={[saveColor]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <OverlayEquipe
          value={nomeEquipe}
          setValue={setNomeEquipe}
          onPress={createTeam}
          editable={!isLoading}
        />
        <CardCreatedTeam
          search={search}
          updateTeamsData={handleUpdateTeamsData} />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  footer: {
    bottom: 0,
    width: "100%",
    height: "auto",
    position: "absolute",
  },
  container: {
    height: "100%",
    width: "100%",
    padding: 16,
    flexDirection: "column",
    margin: 0,
    backgroundColor: "white"
  },
  equipeContainer: {
    paddingTop: 8,
    height: "auto",
    width: "100%",
    gap: 8,
  },
})
