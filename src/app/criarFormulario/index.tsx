import { useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { getToken } from "../../hooks/token"
import { FormData } from "../../interfaces/DadosFormulario"
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
import { getEquipeId } from "../equipes/(components)/CardCreatedTeam"
import { IdStorage } from "../../hooks/getIdForm"
import { saveColor } from "../../utils/constants"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Checkbox from "../components/Checkbox"

export interface ResponseTypePreset {
  id: number
  name: string
  value: "TEXTO" | "BOOLEANO" | "INTEIRO" | "DECIMAL" | "MULTIPLA_ESCOLHA" | "CELSIUS" | "QUILOGRAMA" | "PORCENTAGEM" | "LITRO" | undefined
}

export const responseTypePreset: ResponseTypePreset[] = [
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
  const [expandedUsr, setExpandedUsr] = useState(false)
  const [dataUsr, setDataUsr] = useState<PresetPermittedUsers[]>([])
  const [usuariosPermitidos, setUsuariosPermitidos] = useState<number[]>([])
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])

  const router = useRouter()

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

  const [selectedResponseTypes, setSelectedResponseTypes] = useState<string[]>(new Array(questions.length).fill(''))

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
          perguntas: questions.map((question, index) => ({
            descricao: question.descricao,
            tiporesposta: selectedResponseTypes[index],
            opcional: question.opcional,
          })),
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
        <ScrollView contentContainerStyle={styles.container__inputs}>
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
            style={styles.accordion__style}
            containerStyle={styles.accordion__containerStyle}
            isExpanded={expandedUsr}
            onPress={() => setExpandedUsr(!expandedUsr)}
            content={
              <ListItem.Content>
                <ListItem.Title style={styles.accordion__title}>
                  Usuários permitidos
                </ListItem.Title>
              </ListItem.Content>
            }
          >
            {
              isLoading &&
                isLoading ? (
                <Text>Buscando usuários...</Text>
              ) : dataUsr.length === 0 ? (
                <Text>Nenhum usuário foi encontrado</Text>
              ) : (
                dataUsr.map((user: PresetPermittedUsers) => (
                  <ListItem
                    containerStyle={styles.list__containerStyle}
                    bottomDivider={false}
                    style={styles.list__style}
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
                    <Checkbox
                      label={user.usuario}
                      checkType="square"
                      styleCondition={selectedUsers.includes(user.id)}
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
                  </ListItem>
                ))
              )}
          </ListItem.Accordion>
          {
            questions &&
            questions.map((question, index) => (
              <ScrollView key={index}>
                <View style={styles.question__container}>
                  <CustomInput
                    style={styles.customInput}
                    label={`Pergunta ${index + 1}`}
                    placeholder="Comprou leite?"
                    value={question.descricao}
                    setValue={(value: any) => {
                      const newQuestion = [...questions]
                      newQuestion[index].descricao = value
                      setQuestions(newQuestion)
                    }}
                  />
                  <ListItem.Accordion
                    containerStyle={styles.accordion__containerStyle}
                    isExpanded={expandedRes[index]}
                    onPress={() => {
                      const newExpandedRes = [...expandedRes]
                      newExpandedRes[index] = !newExpandedRes[index]
                      setExpandedRes(newExpandedRes)
                    }}
                    content={
                      <ListItem.Content>
                        <ListItem.Title style={styles.accordion__title}>
                          Tipo de resposta
                        </ListItem.Title>
                      </ListItem.Content>
                    }
                  >
                    {
                      responseTypePreset &&
                      responseTypePreset.map((type: ResponseTypePreset) => (
                        <ListItem
                          key={type.id}
                          style={styles.list__item}
                          containerStyle={styles.list__containerStyle}
                        >
                          <Checkbox
                            label={type.name}
                            checkType="circle"
                            checked={selectedResponseTypes[index] === type.value}
                            styleCondition={selectedResponseTypes[index] === type.value}
                            onPress={() => {
                              const newSelectedResponseTypes = [...selectedResponseTypes]
                              newSelectedResponseTypes[index] = type.value
                              setSelectedResponseTypes(newSelectedResponseTypes)
                              console.log(newSelectedResponseTypes)
                            }} />
                        </ListItem>
                      ))}
                  </ListItem.Accordion>
                  <View style={styles.cardBottom__container}>
                    <View style={styles.switch__container}>
                      <Text style={styles.switch__label}>
                        Obrigatório
                      </Text>
                      <Switch
                        color="black"
                        value={!question.opcional}
                        onValueChange={() => toggleOptional(index)}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        const newQuestions = [...questions]
                        newQuestions.splice(index, 1)
                        setQuestions(newQuestions)
                      }}
                    >
                      <FontAwesome
                        name="trash"
                        size={32}
                        color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            ))}
        </ScrollView >
      </ScrollView >
      <View style={styles.footer}>
        <CustomButton
          title="+ Adicionar Pergunta"
          buttonStyle={styles.footer__button}
          onPress={() => addQuestion()}
        />
        <CustomButton
          title="CRIAR"
          buttonStyle={styles.footer__button}
          titleStyle={styles.footer__titleStyle}
          color={saveColor}
          onPress={createForm}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  responseTypeItem: {
    height: "auto",
    flexDirection: "row",
    padding: 0,
    margin: 0,
    width: "100%",
  },
  footer__titleStyle: {
    fontWeight: "900"
  },
  cardBottom__container: {
    flexDirection: "row",
    width: "100%",
    height: "auto",
    justifyContent: "space-between",
    alignItems: "center"
  },
  customInput: {
    width: "100%",
    gap: 16
  },
  checkbox__Selected: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  checkbox__label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#888888",
  },
  checkbox__wrapperStyle: {
    padding: 0,
    margin: 0,
    height: "auto",
    width: "auto"
  },
  checkbox__containerStyle: {
    padding: 0,
    margin: 0,
    paddingBottom: 8
  },
  list__containerStyle: {
    padding: 0,
    margin: 0,
    height: "auto",
    width: "auto"
  },
  accordion__style: {
    backgroundColor: "#FAFAFA"
  },
  checkbox__container: {
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
  footer__button: {
    width: "100%",
  },
  list__content: {
    padding: 0,
  },
  question__container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderWidth: 1,
    borderColor: "#c5c5c5",
    borderRadius: 4,
    gap: 8,
  },
  container__inputs: {
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
  accordion__containerStyle: {
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
  list__style: {
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
    paddingVertical: 16
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
