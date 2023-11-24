import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, Pressable, ToastAndroid } from "react-native"
import { BASEURL, EDITAR_FORMULARIO, EXCLUIR_FORMULARIO, VER_FORMULARIOS_DA_EQUIPE } from "../../../utils/endpoints"
import { FormData } from "../../../interfaces/DadosFormulario"
import { getToken } from "../../../hooks/token"
import { axiosInstance } from "../../../utils/useAxios"
import { BottomSheet, Icon, LinearProgress, ListItem, Overlay } from "@rneui/themed"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import CustomButton from "../../components/Button"
import { useRouter } from "expo-router"
import { IdStorage } from "../../../hooks/getIdForm"
import { getEquipeId } from "../../equipes/(components)/CardCreatedTeam"
import { deleteColor, saveColor } from "../../../utils/constants"
import CustomInput from "../../components/Input"

export function CardFormulario({ search }: { search: string }) {
  const [data, setData] = useState<FormData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isBottomVisible, setIsBottomVisible] = useState(false)
  const [newName, setNewName] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [isEditVisible, setIsEditVisible] = useState(false)
  const [isDeleteVisible, setIsDeleteVisible] = useState(false)
  const [formName, setFormName] = useState('')
  const [confirmFormName, setConfirmFormName] = useState('')
  const [formId, setFormId] = useState(0)

  const toggleEditOverlay = () => {
    setIsEditVisible(!isEditVisible)
    setIsBottomVisible(false)
    setNewName('')
  }

  const toggleDeleteOverlay = () => {
    setIsDeleteVisible(!isDeleteVisible)
    setIsBottomVisible(false)
    setConfirmFormName('')
  }

  const toggleOverlay = () => {
    setIsModalVisible(!isModalVisible)
  }

  const options = [
    {
      title: "EXCLUIR",
      icon: (<FontAwesome name="trash" color="#FFFFFF" size={24} />),
      containerStyle: { backgroundColor: "#F96262" },
      titleStyle: styles.deleteTitle,
      onPress: () => toggleDeleteOverlay(),
    },
  ]

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

  const editForm = async () => {
    setIsLoading(false)

    const token = await getToken()

    const equipeid = await getEquipeId()

    const formularioId = formId

    try {
      const res = await i.patch(`${BASEURL}${EDITAR_FORMULARIO}/${formularioId}`,
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
        ToastAndroid.show(`Nome do formulário atualizado!`,
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
    editForm()
    router.replace("/equipe/(tabs)/[id]")
    toggleEditOverlay()
  }

  const deleteForm = async () => {
    setIsLoading(false)

    const token = await getToken()

    const equipeid = await getEquipeId()

    const formularioId = formId

    try {
      const res = await i.delete(`${BASEURL}${EXCLUIR_FORMULARIO}/${formularioId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Equipe: equipeid as number
        },
        data: {},
      })
      if (res.status === 200) {
        ToastAndroid.show(`Formulário ${formName} excluido!`,
          ToastAndroid.SHORT)
        setConfirmFormName('')
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

  return (
    <>
      {
        isLoading ? (
          <>
            <Text style={{
              fontSize: 16,
              color: "#606060",
              padding: 8
            }}>
              Buscando formulários da equipe...
            </Text>
            <LinearProgress
              style={{ marginVertical: 8 }}
              color={saveColor}
            />
          </>
        ) :
          filteredForms.length === 0 ? (
            <Text style={{
              fontSize: 16,
              color: "#606060",
              padding: 8
            }}>
              Nenhum formulário foi encontrado.
            </Text>
          ) : (
            filteredForms &&
            filteredForms.map((form: FormData) => (
              <Pressable
                delayLongPress={500}
                key={form.id}
                onLongPress={() => {
                  setFormId(form.id)
                  setFormName(form.nome)
                  setIsBottomVisible(!isBottomVisible),
                    console.log("Aberto")
                }}
                onPress={() => {
                  setIsModalVisible(!isModalVisible)
                }}
                style={styles.formularioContainer}
              >
                <View style={styles.container}>
                  <Text style={styles.title}>
                    {form.nome}
                  </Text>
                  <Text style={styles.subtitle}>
                    Identificação: {form.id}
                  </Text>
                </View>
                <Overlay
                  overlayStyle={styles.overlayStyle}
                  isVisible={isModalVisible}
                  onBackdropPress={toggleOverlay}
                >
                  <View style={styles.overlayHeader}>
                    <Text style={styles.overlayTitle}>
                      O que você deseja fazer?
                    </Text>
                    <FontAwesome
                      name="close"
                      size={24}
                      onPress={toggleOverlay}
                    />
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
                        IdStorage.setIdForm(form.id as any)
                        router.push({
                          pathname: "/(formulario)/responder",
                          params: { equipeid: equipeid as any, formularioid: form.id as any }
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
                        IdStorage.setIdForm(form.id as any)
                        router.push({
                          pathname: "/(formulario)/ver",
                          params: { equipeid: equipeid as any, formularioid: form.id as any }
                        })
                      }}
                    />
                  </View>
                </Overlay>
                <BottomSheet
                  isVisible={isBottomVisible}
                  onBackdropPress={() => setIsBottomVisible(!isBottomVisible)}
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
                  isVisible={isEditVisible}
                  onBackdropPress={toggleEditOverlay}
                >
                  <View style={styles.header}>
                    <Text style={styles.title}>Editar nome do formulário</Text>
                    <FontAwesome name="close" size={24} onPress={toggleEditOverlay} />
                  </View>
                  <CustomInput
                    placeholder={formName}
                    label="Nome atual do formulário"
                    autoComplete="name"
                    editable={false}
                  />
                  <CustomInput
                    placeholder="Digite o novo nome do formulário"
                    label="Nome do formulário"
                    autoComplete="name"
                    value={newName}
                    setValue={setNewName}
                    editable={true}
                  />
                  <CustomButton onPress={onPressSave} title="SALVAR" color={saveColor} />
                </Overlay>
                <Overlay
                  overlayStyle={styles.overlayStyle}
                  isVisible={isDeleteVisible}
                  onBackdropPress={toggleDeleteOverlay}
                >
                  <View style={styles.header}>
                    <Text style={styles.title}>Confirme o nome do formulário</Text>
                    <FontAwesome name="close" size={24} onPress={toggleDeleteOverlay} />
                  </View>
                  <CustomInput
                    placeholder={formName}
                    label="Nome do formulário"
                    autoComplete="name"
                    editable={false}
                  />
                  <CustomInput
                    placeholder="Confirme o nome do formulário"
                    label="Confirmar nome do formulário"
                    autoComplete="name"
                    value={confirmFormName}
                    setValue={setConfirmFormName}
                    editable={true}
                  />
                  {confirmFormName === formName ? (
                    <CustomButton
                      onPress={() => { deleteForm() }}
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
              </Pressable>
            ))
          )}
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
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 8,
  },
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
