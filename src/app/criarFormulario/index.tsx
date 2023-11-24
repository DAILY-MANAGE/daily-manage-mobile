import { useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { getToken } from "../../hooks/token"
import { QuestionData, FormData } from "../../interfaces/DadosFormulario"
import {
  CRIAR_FORMULARIO,
  BASEURL,
  FILTRAR_USUARIOS_DA_EQUIPE,
} from "../../utils/endpoints"
import CustomInput from "../components/Input"
import CustomButton from "../components/Button/index"
import { CheckBox, Switch } from "@rneui/themed"
import { ListItem } from "@rneui/themed"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { axiosInstance } from "../../utils/useAxios"
import { getEquipeId } from "../equipes/(tabs)/index"
import { IdStorage } from "../../hooks/getIdForm"
import { saveColor } from "../../utils/constants"
import FontAwesome from '@expo/vector-icons/FontAwesome'

interface Preset {
  id: number
  name: string
  value: string
}

const presets: Preset[] = [
  {
    id: 1,
    name: "Texto",
    value: "TEXTO",
  },
  {
    id: 2,
    name: "Sim ou Não",
    value: "BOOLEANO",
  },
  {
    id: 3,
    name: "Número Inteiro",
    value: "INTEIRO",
  },
  {
    id: 4,
    name: "Número Decimal",
    value: "DECIMAL",
  },
  {
    id: 5,
    name: "Múltipla Escolha",
    value: "MULTIPLA_ESCOLHA",
  },
  {
    id: 6,
    name: "Celsius",
    value: "CELSIUS",
  },
  {
    id: 7,
    name: "Quilograma",
    value: "QUILOGRAMA",
  },
  {
    id: 8,
    name: "Porcentagem",
    value: "PORCENTAGEM",
  },
  {
    id: 9,
    name: "Litro",
    value: "LITRO",
  },
]

interface PresetPermittedUsers {
  id?: number
  nome?: string
  usuario?: string
  email?: string
}

export default function CriarFormulario() {
  const [nomeFormulario, setNomeFormulario] = useState<string | null>(null)
  const [descricaoFormulario, setDescricaoFormulario] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<FormData[]>([])
  const router = useRouter()
  const [expandedUsr, setExpandedUsr] = useState(false)
  const [dataUsr, setDataUsr] = useState<PresetPermittedUsers[]>([])
  const [usuariosPermitidos, setUsuariosPermitidos] = useState<number[]>([])
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [isChecked, setIsChecked] = useState(false)

  const [questions, setQuestions] = useState([
    {
      descricao: "",
      tiporesposta: "",
      opcional: true,
    },
  ])

  const toggleOptional = (index: number) => {
    const questionsClone = [...questions]
    questionsClone.map((question: (typeof questions)[0], index2: number) => {
      if (index == index2) {
        question.opcional = !question.opcional
      }
      return question
    })
    setQuestions(questionsClone)
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { descricao: "", tiporesposta: "", opcional: false },
    ])
  }

  const i = axiosInstance

  const setIdUsuariosPermitidos = async (data: number[]) => {
    if (data) {
      try {
        await AsyncStorage.setItem(
          "idusuariospermitidos",
          JSON.stringify(data)
        )
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getIdUsuariosPermitidos = async (): Promise<number[] | null> => {
    try {
      const id = await AsyncStorage.getItem("idusuariospermitidos")

      if (id !== null) {
        return JSON.parse(id)
      }
    } catch (error) {
      console.log(error)
    }
    return null
  }

  const [isCheckedList, setIsCheckedList] = useState<boolean[]>(questions.map(() => false))

  const [expandedRes, setExpandedRes] = useState<boolean[]>(new Array(questions.length).fill(false))

  async function getPermittedUsers() {
    setIsLoading(true)

    try {
      const token = await getToken()

      const equipeid = await getEquipeId()

      const res = await i.get(`${BASEURL}${FILTRAR_USUARIOS_DA_EQUIPE}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Equipe: equipeid as number,
        },
        data: {},
      })

      if (res.status === 200) {
        setIdUsuariosPermitidos(usuariosPermitidos)
        setDataUsr(res.data.content)
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
    getPermittedUsers()
  }, [setExpandedUsr])

  const createForm = async () => {
    setIsLoading(true)

    try {
      const token = await getToken()

      const equipeid = await getEquipeId()

      const res = await axiosInstance.post(
        `${BASEURL}${CRIAR_FORMULARIO}`,
        {
          nome: nomeFormulario,
          idusuariospermitidos: usuariosPermitidos,
          descricao: descricaoFormulario,
          perguntas: questions,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Equipe: equipeid as number,
          },
          data: {},
        }
      )

      if (res.status === 201) {
        console.log(`${JSON.stringify(res.data)}`)
        setData(res.data)
        IdStorage.setIdForm(res.data.id)
        router.replace("equipe")
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
      <ScrollView contentContainerStyle={styles.container}>
        <ScrollView contentContainerStyle={styles.inputs}>
          <CustomInput
            label="Nome:"
            placeholder="Digite o nome do formulário"
            value={nomeFormulario}
            setValue={setNomeFormulario}
          />
          <CustomInput
            label="Descrição:"
            placeholder="Digite a descrição do formulário"
            value={descricaoFormulario}
            setValue={setDescricaoFormulario}
          />
          <ListItem.Accordion
            style={{ backgroundColor: "#FAFAFA" }}
            containerStyle={styles.accordion__container}
            content={
              <ListItem.Content>
                <ListItem.Title style={styles.accordion__title}>
                  Usuários permitidos
                </ListItem.Title>
              </ListItem.Content>
            }
            isExpanded={expandedUsr}
            onPress={() => setExpandedUsr(!expandedUsr)}
          >
            {isLoading && isLoading ? (
              <Text>Buscando usuários...</Text>
            ) : dataUsr.length === 0 ? (
              <Text>Nenhum usuário foi encontrado</Text>
            ) : (
              dataUsr.map((user: PresetPermittedUsers) => (
                <ListItem
                  containerStyle={{ padding: 0, margin: 0, height: "auto", width: "auto" }}
                  bottomDivider={false}
                  style={styles.list}
                  key={user.id}
                  onPress={() => {
                    setUsuariosPermitidos((prevState) => {
                      if (prevState.includes(user.id)) {
                        return prevState.filter((id) => id !== user.id)
                      }
                      return [...prevState, user.id]
                    })
                  }}
                >
                  <View
                    style={styles.userItem}
                    key={user.id}
                  >
                    <CheckBox
                      size={24}
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      checkedColor={saveColor}
                      containerStyle={{ padding: 0, margin: 0, paddingBottom: 8 }}
                      wrapperStyle={{ padding: 0, margin: 0, height: "auto", width: "auto" }}
                      checked={selectedUsers.includes(user.id)}
                      onPress={() => {
                        setSelectedUsers(prevSelected => {
                          if (prevSelected.includes(user.id)) {
                            return prevSelected.filter(id => id !== user.id)
                          }
                          return [...prevSelected, user.id]
                        })
                      }}
                    />

                    <Text style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: selectedUsers.includes(user.id) ? "black" : "#888888",
                    }}>{user.usuario}</Text>
                  </View>
                </ListItem>
              ))
            )}
          </ListItem.Accordion>
          {questions.map((question, i) => (
            <ScrollView key={i}>
              <View style={styles.question}>
                <CustomInput
                  style={{ width: "100%", gap: 16 }}
                  label={`Pergunta ${i + 1}`}
                  placeholder="Comprou leite?"
                  value={question.descricao}
                  setValue={(value: any) => {
                    const newQuestion = [...questions]
                    newQuestion[i].descricao = value
                    setQuestions(newQuestion)
                  }}
                />

                <ListItem.Accordion
                  containerStyle={styles.accordion__container}
                  content={
                    <ListItem.Content>
                      <ListItem.Title style={styles.accordion__title}>
                        Tipo de resposta
                      </ListItem.Title>
                    </ListItem.Content>
                  }
                  isExpanded={expandedRes[i]}
                  onPress={() => {
                    const newExpandedRes = [...expandedRes]
                    newExpandedRes[i] = !newExpandedRes[i]
                    setExpandedRes(newExpandedRes)
                  }}
                >
                  {presets.map((data: Preset) => (
                    <ListItem
                      key={data.id}
                      style={styles.list}
                    >
                      <CheckBox
                        size={24}
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        checkedColor={saveColor}
                        containerStyle={{ padding: 0, margin: 0, paddingBottom: 8 }}
                        wrapperStyle={{ padding: 0, margin: 0, height: "auto", width: "auto" }}
                        checked={isCheckedList[i]}
                        onPress={() => {
                          const newIsCheckedList = [...isCheckedList]
                          newIsCheckedList[i] = !newIsCheckedList[i]
                          setIsCheckedList(newIsCheckedList)

                          const newQuestion = [...questions]
                          newQuestion[i].tiporesposta = data.value
                          setQuestions(newQuestion)
                        }}
                      />
                      <Text>{data.name}</Text>
                    </ListItem>
                  ))}
                </ListItem.Accordion>
                <View style={{ flexDirection: "row", width: "100%", height: "auto", justifyContent: "space-between", alignItems: "center" }}>
                  <View style={styles.switch__container}>
                    <Text style={styles.switch__label}>Obrigatório</Text>
                    <Switch
                      color="black"
                      value={!question.opcional}
                      onValueChange={() => toggleOptional(i)}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      const newQuestions = [...questions]
                      newQuestions.splice(i, 1)
                      setQuestions(newQuestions)
                    }}
                  >
                    <FontAwesome name="trash" size={32} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          ))}
        </ScrollView>
      </ScrollView >
      <View style={styles.footer}>
        <CustomButton
          buttonStyle={styles.createButton}
          onPress={() => addQuestion()}
          title={"+ Adicionar Pergunta"}
        />
        <CustomButton
          buttonStyle={styles.createButton}
          color="#12d185"
          onPress={createForm}
          title="CRIAR"
          titleStyle={{ fontWeight: 900 }}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  userItem: {
    height: "auto",
    flexDirection: "row",
    padding: 0,
    margin: 0,
    width: "100%",
  },
  list__item: {
    padding: 0,
  },
  footer__buttons: {
    flexDirection: "row",
    width: "100%",
  },
  createButton: {
    width: "100%",
  },
  list__content: {
    padding: 0,
  },
  question: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderWidth: 1,
    borderColor: "#c5c5c5",
    borderRadius: 4,
    gap: 8,
  },
  inputs: {
    gap: 16,
  },
  footer: {
    width: "100%",
    height: "auto",
    bottom: 0,
    gap: 8,
    backgroundColor: "white",
    position: "relative",
    alignSelf: "center",
    justifyContent: "space-evenly",
    padding: 16,
  },
  accordion__container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c1c1c1"
  },
  accordion__title: {
    fontSize: 16,
    fontWeight: "500",
  },
  list: {
    width: "100%",
    height: "auto",
    margin: 0,
    padding: 0,
  },
  container: {
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    backgroundColor: "white",
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  switch__container: {
    flexDirection: "row",
    gap: 8,
    width: "auto",
    alignItems: "center",
  },
  switch__label: {
    fontSize: 16,
    fontWeight: "700",
  },
})
