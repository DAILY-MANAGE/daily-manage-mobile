import React, { useEffect, useState } from "react"
import { View, Text, ToastAndroid, ScrollView, StyleSheet } from "react-native"
import { getToken } from "../../../hooks/token"
import { getEquipeId } from "../../equipes/(components)/CardCreatedTeam"
import { axiosInstance } from "../../../utils/useAxios"
import { BASEURL, RESPONDER_FORMULARIO, VER_FORMULARIO_POR_ID } from "../../../utils/endpoints"
import { IdStorage } from "../../../hooks/getIdForm"
import { useRouter } from "expo-router"
import { QuestionData } from '../../../interfaces/DadosFormulario'
import CustomInput from "../../components/Input"
import { CheckBox, LinearProgress } from "@rneui/themed"
import CustomButton from "../../components/Button"
import { saveColor } from "../../../utils/constants"
import Checkbox from "../../components/Checkbox"

export interface AnswerData {
  idpergunta: number,
  resposta: any
}

export interface Question {
  id?: number,
  descricao?: string,
  tiporespostadefault?: string,
  tipoResposta?: string,
  opcional?: boolean,
  resposta?: any,
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
  const [progress, setProgress] = useState(0)

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
        router.replace('/equipe/(tabs)/[id]')
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
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Perguntas</Text>
        {
          isLoading ? (
            <View style={styles.loadingView}>
              <Text style={{
                fontSize: 16,
                color: "#606060",
                padding: 8
              }}>
                Buscando perguntas do formulário...
              </Text>
              <LinearProgress
                style={{ marginVertical: 8 }}
                color={saveColor}
              />
            </View>
          ) :
            questions.length === 0 ? (
              <View style={styles.loadingView}>
                <Text style={{
                  fontSize: 16,
                  color: "#606060",
                  padding: 8
                }}>
                  Nenhuma pergunta foi encontrada.
                </Text>
              </View>
            ) :
              questions &&
              questions.map((question: Question) => (
                <ScrollView
                  contentContainerStyle={styles.inputs}
                  key={question.id}>
                  {
                    question &&
                      question.tipoResposta === 'TEXTO' ? (
                      <CustomInput
                        key={question.id}
                        label={question.descricao}
                        placeholder="Digite a resposta"
                        setValue={(value: any) => handleAnswerChange(question.id, value)}
                      />
                    ) :
                      question &&
                        question.tipoResposta === 'INTEIRO' ? (
                        <CustomInput
                          key={question.id}
                          label={question.descricao}
                          placeholder="Digite a resposta"
                          setValue={(value: any) => handleAnswerChange(question.id, value)}
                        />
                      ) :
                        question &&
                          question.tipoResposta === 'BOOLEANO' ? (
                          <View style={styles.boolean__container}>
                            <Text style={styles.boolean__label}>
                              {question.descricao}
                            </Text>
                            <View>
                              <Checkbox
                                label="Sim"
                                checkType="circle"
                                checked={booleanAnswers[question.id] || false}
                                onPress={() => {
                                  handleBooleanAnswerChange(question.id, !booleanAnswers[question.id])
                                }}
                              />
                              <Checkbox
                                label="Não"
                                checkType="circle"
                                checked={!booleanAnswers[question.id] || false}
                                onPress={() => {
                                  handleBooleanAnswerChange(question.id, !booleanAnswers[question.id])
                                }}
                              />
                            </View>
                          </View>
                        ) : question &&
                          question.tipoResposta === 'DECIMAL' ? (
                          <CustomInput
                            key={question.id}
                            label={question.descricao}
                            placeholder="Digite a resposta"
                            setValue={(value: any) => handleAnswerChange(question.id, value)}
                          />
                        ) :
                          question &&
                            question.tipoResposta === 'MULTIPLA_ESCOLHA' ? (
                            <CustomInput
                              key={question.id}
                              label={question.descricao}
                              placeholder="Digite a resposta <- FALTA VALIDAR"
                              setValue={(value: any) => handleAnswerChange(question.id, value)}
                            />
                          ) :
                            question &&
                              question.tipoResposta === 'CELSIUS' ? (
                              <CustomInput
                                key={question.id}
                                label={question.descricao}
                                placeholder="Digite a resposta"
                                setValue={(value: any) => handleAnswerChange(question.id, value)}
                              />
                            ) :
                              question &&
                                question.tipoResposta === 'QUILOGRAMA' ? (
                                <CustomInput
                                  key={question.id}
                                  label={question.descricao}
                                  placeholder="Digite a resposta"
                                  setValue={(value: any) => handleAnswerChange(question.id, value)}
                                />
                              ) :
                                question &&
                                  question.tipoResposta === 'PORCENTAGEM' ? (
                                  <CustomInput
                                    key={question.id}
                                    label={question.descricao}
                                    placeholder="Digite a resposta"
                                    setValue={(value: any) => handleAnswerChange(question.id, value)}
                                  />
                                ) :
                                  question &&
                                    question.tipoResposta === 'LITRO' ? (
                                    <CustomInput
                                      key={question.id}
                                      label={question.descricao}
                                      placeholder="Digite a resposta"
                                      setValue={(value: any) => handleAnswerChange(question.id, value)}
                                    />
                                  ) : ('')}
                </ScrollView>
              ))}
      </ScrollView>
      <View style={styles.footer}>
        {
          isLoading ? (
            <CustomButton
              loading
              buttonStyle={styles.footer__button}
              title="SALVAR"
              onPress={() => saveAnswers()}
              color="black" />
          ) : questions.length === 0 ? (
            <CustomButton
              buttonStyle={styles.footer__button}
              title=":("
              onPress={() => ToastAndroid.show(`Não foram encontradas perguntas neste formulário.`,
                ToastAndroid.SHORT)}
              color="black" />
          ) : (<CustomButton
            buttonStyle={styles.footer__button}
            title="SALVAR"
            onPress={() => saveAnswers()}
            color={saveColor} />)
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    height: "100%"
  },
  footer: {
    width: "100%",
    height: "auto",
    bottom: 0,
    padding: 16
  },
  footer__button: {
    width: "100%",
    height: "auto"
  },
  boolean__label: {
    fontSize: 16
  },
  boolean__container: {
    gap: 8,
  },
  loadingView: {
    width: "100%",
    height: "100%",
    padding: 8
  },
  container: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 16,
    paddingHorizontal: 24,
    height: "auto",
  },
  title: {
    paddingVertical: 16,
    fontSize: 24,
    fontWeight: "700"
  },
  inputs: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 16,
    height: "auto",
    flexDirection: "column",
    width: "100%",
  },
})