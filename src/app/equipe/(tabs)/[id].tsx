import React, { useCallback, useState } from "react"
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native"
import { useRouter } from "expo-router"
import { CardFormulario } from "../(components)/CardFormulario"
import { IdStorage } from "../../../hooks/useId"
import CustomButton from "../../components/Button"
import SearchBar from "../../components/SearchBar"
import { saveColor } from "../../../utils/constants"

export const equipeid = IdStorage.getId()

export default function Formularios() {
  const [refreshing, setRefreshing] = useState(false)
  const [search, setSearch] = useState("")

  const router = useRouter()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      router.replace("equipe")
    }, 500)
  }, [])

  const handleSearch = (text: string) => {
    setSearch(text)
  }

  return (
    <>
      <SearchBar placeholder="Pesquisar formulários" value={search} onChangeText={handleSearch} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressBackgroundColor={"#262626"}
            colors={[saveColor]} />
        }
      >
        <CustomButton
          title="+ Criar Formulario"
          onPress={() => router.push("criarFormulario")}
        />
        <CardFormulario search={search} />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  formularioContainer: {
    paddingTop: 8,
    height: "auto",
    width: "100%",
    gap: 8,
  },
  container: {
    gap: 8,
    height: "auto",
    width: "100%",
    padding: 16,
    flexDirection: "column",
    margin: 0,
    backgroundColor: "white"
  },
  actions: {
    alignItems: "center",
    width: "100%",
    height: "auto",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  overlayStyle: {
    borderRadius: 16,
    padding: 16,
    width: "90%",
    height: "auto",
    margin: 0,
    gap: 16,
  },
  overlayHeader: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 8,
  },
  overlayTitle: {
    paddingTop: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonRight: {
    width: "auto",
    height: 48,
    backgroundColor:
      "rgb(77,68,226), linear-gradient(90deg, rgba(77,68,226,1) 35%, rgba(87,30,139,1) 100%)",
  },
  button: {
    width: "auto",
    height: 48,
    backgroundColor: "black",
  },
})
