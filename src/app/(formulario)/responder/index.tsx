import React, { useEffect, useState } from "react"
import { View, Text, ToastAndroid } from "react-native"
import { getToken } from "../../../hooks/token"
import { getEquipeId } from "../../equipes/(tabs)"
import { axiosInstance } from "../../../utils/useAxios"
import { BASEURL, RESPONDER_FORMULARIO, VER_FORMULARIO_POR_ID } from "../../../utils/endpoints"
import { IdStorage } from "../../../hooks/getIdForm"
import { useRouter } from "expo-router"
import { QuestionData, ResponseType } from '../../../interfaces/DadosFormulario'
import CustomInput from "../../components/Input"
import { CheckBox } from "@rneui/themed"
import CustomButton from "../../components/Button"

export interface AnswerData {
  idpergunta: number,
  resposta: any
}

export interface Question {
  id?: number,
  descricao?: string,
  tiporespostadefault?: string,
  tipoResposta?: string,
  opcional?: boolean
}

export const getFormId = async () => {
  return await IdStorage.getIdForm()
}

export default function ResponderFormulario() {
  const [isLoading, setIsLoading] = useState(false)
  const [answers, setAnswers] = useState<AnswerData[]>([])
  const [questions, setQuestions] = useState<QuestionData[]>([])
  const [isChecked, setIsChecked] = useState(false)
  const [booleanAnswers, setBooleanAnswers] = useState<{ [key: number]: boolean }>({})

  const i = axiosInstance

  const router = useRouter()

  async function getFormsById() {
    setIsLoading(true)

    try {
      const token = await getToken()

      const formularioid = await getFormId()

      const equipeid = await getEquipeId()

      const res = await i.get(`${BASEURL}${VER_FORMULARIO_POR_ID}/${formularioid as number}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Equipe: equipeid as number,
        },
        data: {},
      })

      if (res.status === 200) {
        setQuestions(res.data.perguntas)
        setIsLoading(false)
      } else {
        throw new Error(`${JSON.stringify(res.data)}`)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getFormsById()
    setIsLoading(false)
  }, [])

  const saveAnswers = async () => {
    setIsLoading(false)

    const token = await getToken()

    const equipeid = await getEquipeId()

    const formularioid = await getFormId()

    console.log(formularioid as number)

    try {
      const res = await i.post(`${BASEURL}${RESPONDER_FORMULARIO}/${formularioid as number}/responder`, {
        respostas: [...answers]
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Equipe: equipeid as number,
          },
          data: {},
        })
      if (res.status === 201) {
        ToastAndroid.show(`Formulário ${formularioid} respondido!`,
          ToastAndroid.SHORT)
      } else {
        throw new Error(`${JSON.stringify(res.data)}`)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      console.log(answers)
    }
  }

  const handleAnswerChange = (questionId: number, value: any) => {
    setAnswers(prevAnswers => {
      const existingAnswer = prevAnswers.find(answer => answer.idpergunta === questionId)

      if (existingAnswer) {
        return prevAnswers.map(answer =>
          answer.idpergunta === questionId ? { idpergunta: questionId, resposta: value } : answer
        )
      } else {
        return [...prevAnswers, { idpergunta: questionId, resposta: value }]
      }
    })
  }

  const handleBooleanAnswerChange = (questionId: number, value: boolean) => {
    setBooleanAnswers(prevBooleanAnswers => ({
      ...prevBooleanAnswers,
      [questionId]: value,
    }))
    handleAnswerChange(questionId, value)
  }

  return (
    <>
      {questions && questions.map((question: Question) => (
        <View key={question.id}>
          {question && question.tipoResposta === 'TEXTO' ? (
            (<CustomInput
              key={question.id}
              label={question.descricao}
              placeholder="Texto"
              setValue={(value: any) => handleAnswerChange(question.id, value)}
            />)
          ) : question && question.tipoResposta === 'INTEIRO' ? (
            (<CustomInput
              key={question.id}
              label={question.descricao}
              placeholder="INTEGER"
              setValue={(value: any) => handleAnswerChange(question.id, value)}
            />)
          ) : question && question.tipoResposta === 'BOOLEANO' ? (
            (
              <>
                <View style={{ flexDirection: "row", gap: 16 }}>
                  <CheckBox checked={booleanAnswers[question.id] || false} onPress={() => { handleBooleanAnswerChange(question.id, !booleanAnswers[question.id]) }} />
                  <Text>Sim</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 16 }}>
                  <CheckBox checked={!booleanAnswers[question.id] || false} onPress={() => { handleBooleanAnswerChange(question.id, !booleanAnswers[question.id]) }} />
                  <Text>Não</Text>
                </View>
              </>
            )
          ) : ('')}
        </View>
      ))}
      <CustomButton onPress={() => saveAnswers()} title="Salvar" />

    </>
  )
}
