import { useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet, ScrollView } from "react-native"
import { getToken } from "../../hooks/token"
import { QuestionData, FormData } from "../../interfaces/DadosFormulario"
import { CRIAR_FORMULARIO, BASEURL, FILTRAR_USUARIOS_DA_EQUIPE } from "../../utils/endpoints"
import CustomInput from "../components/Input"
import CustomButton from "../components/Button/index"
import { Switch } from "@rneui/themed"
import { ListItem } from "@rneui/themed"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { axiosInstance } from '../../utils/useAxios'
import { getEquipeId } from "../equipes/(tabs)/index"

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
  const [descricaoPergunta, setDescricaoPergunta] = useState<string | null>(null)
  const [tipoResposta, setTipoResposta] = useState<string | null>(null)
  const [respostaOpcional, setRespostaOpcional] = useState<boolean | null>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<FormData[]>([])
  const [expandedRes, setExpandedRes] = useState(false)
  const [countValue, setCountValue] = useState(1)
  const [questions, setQuestions] = useState<QuestionData[]>()
  const router = useRouter()
  const [expandedUsr, setExpandedUsr] = useState(false)
  const [dataUsr, setDataUsr] = useState<PresetPermittedUsers[]>([])
  const [usuariosPermitidos, setUsuariosPermitidos] = useState<number[]>([])

  const i = axiosInstance

  const resetCounter = () => {
    setCountValue(1)
  }

  const setIdUsuariosPermitidos = async (data: number[]) => {
    if (data) {
      console.log(data)
      try {
        await AsyncStorage.setItem("idusuariospermitidos", JSON.stringify(data))
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

  const clearFields = () => {
    setNomeFormulario("")
    setDescricaoFormulario("")
    setDescricaoPergunta("")
    setTipoResposta("")
    setIdUsuariosPermitidos(null)
    setRespostaOpcional(false)
  }

  async function getPermittedUsers() {

    setIsLoading(true)

    try {
      const token = await getToken()

      const equipeid = await getEquipeId()

      const res = await i.get(
        `${BASEURL}${FILTRAR_USUARIOS_DA_EQUIPE}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Equipe: equipeid as number,
          },
          data: {},
        }
      )

      if (res.status === 200) {
        setIdUsuariosPermitidos(usuariosPermitidos)
        setDataUsr(res.data.content)
        setIsLoading(false)
      }

      else {
        throw new Error(`${JSON.stringify(res.data)}`)
      }

    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getPermittedUsers()
  }, [setExpandedUsr])

  const createForm = async () => {

    setIsLoading(true)

    try {
      const token = await getToken()

      const equipeid = await getEquipeId()

      const idUsuariosPermitidos = await getIdUsuariosPermitidos()

      const res = await i.post(
        `${BASEURL}${CRIAR_FORMULARIO}`,
        {
          nome: nomeFormulario,
          descricao: descricaoFormulario,
          perguntas: [
            {
              descricao: descricaoPergunta,
              tiporesposta: tipoResposta,
              opcional: respostaOpcional,
            },
          ],
          idusuariospermitidos: idUsuariosPermitidos,
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
        setQuestions(res.data.questions)
        console.log(questions)
        clearFields()
        router.back()
        resetCounter()
        setIsLoading(false)
      }

      else { throw new Error(`${JSON.stringify(res.data)}`) }

    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  return (

    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputs}>
        <CustomInput
          label="Nome:"
          placeholder="Lista de Compras..."
          value={nomeFormulario}
          setValue={setNomeFormulario}
        />
        <CustomInput
          label="Descrição:"
          placeholder="Lista de compras da família Lutherik..."
          value={descricaoFormulario}
          setValue={setDescricaoFormulario}
        />
        <ListItem.Accordion
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

          {isLoading &&
            isLoading ? (<Text>Buscando usuários...</Text>) :
            dataUsr.length === 0 ? (<Text>Nenhum usuário foi encontrado</Text>) :
              dataUsr.map((user: PresetPermittedUsers) => (
                <ListItem
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
                  bottomDivider
                >
                  <ListItem.Content>
                    <ListItem.Title>{user.usuario}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}

        </ListItem.Accordion>
        <ScrollView>
          <View style={styles.question}>
            <CustomInput
              label={`Pergunta ${countValue}`}
              placeholder="Comprou leite?"
              value={descricaoPergunta}
              setValue={setDescricaoPergunta}
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
              isExpanded={expandedRes}
              onPress={() => setExpandedRes(!expandedRes)}
            >

              {presets.map((data: Preset) => (
                <ListItem
                  key={data.id}
                  style={styles.list}
                  onPress={() => { setTipoResposta(data.value); console.log(tipoResposta) }}
                  bottomDivider>

                  <ListItem.Content style={styles.list__content}>
                    <ListItem.Title>{data.name}</ListItem.Title>
                  </ListItem.Content>

                </ListItem>
              ))}

            </ListItem.Accordion>

            <View style={styles.switch__container}>
              <Text style={styles.switch__label}>Obrigatório</Text>
              <Switch
                color="black"
                value={respostaOpcional}
                onValueChange={(value) => setRespostaOpcional(value)}
              />
            </View>
          </View>
        </ScrollView>
        <CustomButton onPress={() => { }} title={"+ Adicionar Pergunta"} />
      </View>
      <View style={styles.footer}>
        <CustomButton onPress={createForm} title={"+ Criar"} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list__content: {
    backgroundColor: "#FFFFFF",
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
  },
  accordion__container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  accordion__title: {
    fontSize: 16,
    fontWeight: "500",
  },
  list: {
    width: "60%",
    height: "auto",
  },
  container: {
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    backgroundColor: "white",
    gap: 8,
    padding: 16,
  },
  switch__container: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
    alignItems: "center",
  },
  switch__label: {
    fontSize: 16,
    fontWeight: "700",
  },
})
