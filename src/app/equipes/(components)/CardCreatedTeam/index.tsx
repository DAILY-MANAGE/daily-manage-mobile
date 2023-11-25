import React, { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native"
import { BASEURL, EDITAR_EQUIPE, EXCLUIR_EQUIPE, VER_EQUIPES_CRIADAS } from "../../../../utils/endpoints"
import { DadosEquipe } from "../../../../interfaces/DadosEquipe"
import { getToken } from "../../../../hooks/token"
import { IdStorage } from "../../../../hooks/useId"
import { useRouter } from "expo-router"
import { axiosInstance } from "../../../../utils/useAxios"
import { BottomSheet, LinearProgress, ListItem, Overlay } from "@rneui/themed"
import { deleteColor, saveColor } from "../../../../utils/constants"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import CustomInput from "../../../components/Input"
import CustomButton from "../../../components/Button"

export const getEquipeId = async () => {
  return await IdStorage.getId()
}

export function CardCreatedTeam({
  search,
  updateTeamsData
}: {
  search: string,
  updateTeamsData: () => void
}) {
  const [data, setData] = useState<DadosEquipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [newName, setNewName] = useState('')
  const [visible, setVisible] = useState(false)
  const [isDeleteOverlayVisible, setIsDeleteOverlayVisible] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [confirmTeamName, setConfirmTeamName] = useState('')

  const toggleEditOverlay = () => {
    setVisible(!visible)
    setIsVisible(!isVisible)
  }

  const toggleDeleteOverlay = () => {
    setIsDeleteOverlayVisible(!isDeleteOverlayVisible)
    setIsVisible(!isVisible)
  }

  const options = [
    {
      title: "EDITAR",
      icon: (<FontAwesome name="edit" color="orange" size={24} />),
      onPress: () => toggleEditOverlay(),
      titleStyle: styles.editTitle,
    },
    {
      title: "EXCLUIR",
      icon: (<FontAwesome name="trash" color="#FFFFFF" size={24} />),
      containerStyle: { backgroundColor: "#F96262" },
      titleStyle: styles.deleteTitle,
      onPress: () => toggleDeleteOverlay(),
    },
  ]

  const router = useRouter()

  const i = axiosInstance

  const editTeam = async () => {
    setIsLoading(false)

    const token = await getToken()

    const equipeid = await getEquipeId()

    try {
      const res = await i.patch(`${BASEURL}${EDITAR_EQUIPE}`,
        {
          nome: newName
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Equipe: equipeid as number
          },
          data: {},
        })
      if (res.status === 200) {
        ToastAndroid.show(`Nome da equipe atualizado!`,
          ToastAndroid.SHORT)
        setIsLoading(false)
      } else {
        throw new Error(`${JSON.stringify(res.data)}`)
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  const onPressSave = () => {
    editTeam()
    router.replace("equipes")
    toggleEditOverlay()
  }

  const deleteTeam = async () => {
    setIsLoading(false)

    const token = await getToken()

    const equipeid = await getEquipeId()

    try {
      const res = await i.delete(`${BASEURL}${EXCLUIR_EQUIPE}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Equipe: equipeid as number
        },
        data: {},
      })
      if (res.status === 200) {
        ToastAndroid.show(`Equipe ${teamName} excluida!`,
          ToastAndroid.SHORT)
        setConfirmTeamName('')
        toggleDeleteOverlay()
        setIsLoading(false)
      } else {
        throw new Error(`${JSON.stringify(res.data)}`)
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

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
    setIsLoading(false)
    getCreatedTeams().finally(() => setIsLoading(false))
  }, [updateTeamsData])

  React.useEffect(() => {
    let subs = true
    if (progress < 1 && progress !== 0) {
      setTimeout(() => {
        if (subs) {
          setProgress(progress + 0.1)
        }
      }, 100)
    }
    return () => {
      subs = false
    }
  }, [progress])

  return (
    <>
      {isLoading ?
        (
          <>
            <Text style={{ fontSize: 16, color: "#606060", padding: 8 }}>
              Buscando equipes...
            </Text>
            <LinearProgress style={{ marginVertical: 8 }} color={saveColor} />
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
              onLongPress={() => {
                setTeamName(team.nome)
                IdStorage.setId(team.id as any)
                setIsVisible(!isVisible),
                  console.log("Aberto")
              }}
              onPress={() => {
                IdStorage.setId(team.id as any)
                router.push({
                  pathname: `/equipe/(tabs)/${team.id as any}`,
                  params: { equipeid: team.id as any }
                })
              }}
            >
              <>
                <View key={team.id} style={styles.container}>
                  <Text style={styles.title}>{team.nome}</Text>
                  <Text style={styles.subitle}>Identificação: {team.id}</Text>
                </View>
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
                      <ListItem.Content style={styles.bottomSheet__container}>
                        {l.icon}
                        <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  ))}
                </BottomSheet>
                <Overlay
                  overlayStyle={styles.overlayStyle}
                  isVisible={visible}
                  onBackdropPress={toggleEditOverlay}
                >
                  <View style={styles.header}>
                    <Text style={styles.title}>Editar nome da equipe</Text>
                    <FontAwesome name="close" size={24} onPress={toggleEditOverlay} />
                  </View>

                  <CustomInput
                    placeholder="Digite o novo nome da Equipe"
                    label="Nome da Equipe"
                    autoComplete="name"
                    value={newName}
                    setValue={setNewName}
                    editable={true}
                  />
                  <CustomButton onPress={onPressSave} title="SALVAR" color={saveColor} />
                </Overlay>
                <Overlay
                  overlayStyle={styles.overlayStyle}
                  isVisible={isDeleteOverlayVisible}
                  onBackdropPress={toggleDeleteOverlay}
                >
                  <View style={styles.header}>
                    <Text style={styles.title}>Confirme o nome da equipe</Text>
                    <FontAwesome name="close" size={24} onPress={toggleDeleteOverlay} />
                  </View>
                  <CustomInput
                    placeholder={teamName}
                    label="Nome da Equipe"
                    autoComplete="name"
                    editable={false}
                  />
                  <CustomInput
                    placeholder="Confirme o nome da Equipe"
                    label="Confirmar nome da Equipe"
                    autoComplete="name"
                    value={confirmTeamName}
                    setValue={setConfirmTeamName}
                    editable={true}
                  />
                  {confirmTeamName === teamName ? (
                    <CustomButton
                      onPress={() => { deleteTeam() }}
                      title="EXCLUIR"
                      color={deleteColor}
                    />
                  ) : (
                    <CustomButton
                      onPress={() => { }}
                      title="Excluir"
                      disabled={true}
                      color="#ccc"
                    />
                  )}
                </Overlay>
              </>
            </Pressable>
          ))
      }
    </>
  )
}

const styles = StyleSheet.create({
  editTitle: {
    color: "orange",
    fontWeight: "bold"
  },
  deleteTitle: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 16
  },
  bottomSheet__container: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  overlayStyle: {
    borderRadius: 16,
    padding: 16,
    width: "90%",
    height: "auto",
    margin: 0,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 8,
  },
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
