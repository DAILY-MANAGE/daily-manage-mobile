import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, Pressable } from "react-native"
import { BASEURL, VER_FORMULARIOS_DA_EQUIPE } from "../../../utils/endpoints"
import { FormData } from "../../../interfaces/DadosFormulario"
import { getToken } from "../../../hooks/token"
import { axiosInstance } from "../../../utils/useAxios"
import { BottomSheet, Icon, ListItem, Overlay } from "@rneui/themed"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import CustomButton from "../../components/Button"
import { useRouter } from "expo-router"
import { IdStorage } from "../../../hooks/useId"
import { getEquipeId } from "../../equipes/(tabs)"

export function CardFormulario({ search }: { search: string }) {
  const [data, setData] = useState<FormData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const options = [
    {
      title: "Editar Nome",
      onPress: () => { },
    },
    {
      title: "Deletar Formulário",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => { },
    },
  ]

  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const i = axiosInstance

  const router = useRouter()

  async function getForms() {
    setIsLoading(true)

    try {
      const token = await getToken()

      const equipeid = await getEquipeId()

      const res = await i.get(`${BASEURL}${VER_FORMULARIOS_DA_EQUIPE}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Equipe: equipeid as number,
        },
        data: {},
      })

      if (res.status === 200) {
        setData(res.data.content)
        setIsLoading(false)
      } else {
        throw new Error(`${JSON.stringify(res.data)}`)
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getForms()
  }, [])

  const filteredForms = data.filter((form) =>
    search ? form.nome.toLowerCase().includes(search.toLowerCase()) : true
  )

  return (
    <>
      {isLoading ? (
        <Text>Buscando formulários da equipe...</Text>
      ) : filteredForms.length === 0 ? (
        <Text>Nenhum formulário foi encontrado...</Text>
      ) : (
        filteredForms &&
        filteredForms.map((form: FormData) => (
          <Pressable
            delayLongPress={500}
            key={form.id}
            onLongPress={() => {
              setIsVisible(!isVisible), console.log("oadimawoimdaoiwd")
            }}
            onPress={() => {
              setVisible(!visible)
            }}
            style={styles.formularioContainer}
          >
            <View style={styles.container}>
              <Text style={styles.title}>{form.nome}</Text>
              <Text style={styles.subtitle}>Identificação: {form.id}</Text>
            </View>
            <Overlay
              overlayStyle={styles.overlayStyle}
              isVisible={visible}
              onBackdropPress={toggleOverlay}
            >
              <View style={styles.overlayHeader}>
                <Text style={styles.overlayTitle}>O que você deseja fazer?</Text>
                <FontAwesome name="close" size={24} onPress={toggleOverlay} />
              </View>
              <View style={styles.actions}>
                <CustomButton
                  icon={
                    <Icon
                      name="check"
                      type="font-awesome"
                      color="white"
                      size={25}
                      iconStyle={{ marginRight: 10 }}
                    />
                  }
                  title="Responder"
                  color="black"
                  buttonStyle={styles.button}
                  onPress={async () => {
                    const equipeid = await getEquipeId()
                    IdStorage.setId(equipeid as any)
                    router.push({
                      pathname: "/(formulario)/responder",
                      params: { equipeid: equipeid as any }
                    })
                  }}
                />
                <CustomButton
                  icon={
                    <Icon
                      name="eye"
                      type="font-awesome"
                      color="white"
                      size={25}
                      iconStyle={{ marginRight: 10 }}
                    />
                  }
                  title="Ver respostas"
                  buttonStyle={styles.buttonRight}
                  onPress={async () => {
                    const equipeid = await getEquipeId()
                    IdStorage.setId(equipeid as any)
                    router.push({
                      pathname: "/(formulario)/ver",
                      params: { equipeid: equipeid as any }
                    })
                  }}
                />
              </View>
            </Overlay>
            <BottomSheet
              isVisible={isVisible}
              onBackdropPress={() => setIsVisible(!isVisible)}
            >
              {options.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={l.containerStyle}
                  onPress={l.onPress}
                >
                  <ListItem.Content>
                    <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </BottomSheet>
          </Pressable>
        ))
      )}
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
  actions: {
    alignItems: "center",
    width: "100%",
    height: "auto",
    justifyContent: "space-between",
    flexDirection: "row",
  },
})
