import { useRouter } from "expo-router"
import { axiosInstance } from "../../../utils/useAxios"
import { getToken } from "../../../hooks/token"
import { AnswerData, Question, getFormId } from "../responder"
import { getEquipeId } from "../../equipes/(components)/CardCreatedTeam"
import { useEffect, useState } from "react"
import { BASEURL, VER_RESPOSTAS_DE_UM_FORMULARIO } from "../../../utils/endpoints"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { FormData, FormDataRead, PermittedUsers, QuestionData, QuestionDataRead, ResponseType } from '../../../interfaces/DadosFormulario'
import CustomInput from "../../components/Input"
import Checkbox from "../../components/Checkbox"
import { LinearProgress } from "@rneui/themed"
import { saveColor } from "../../../utils/constants"
import CustomButton from "../../components/Button"

export default function VerRespostas() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormDataRead[]>([])

  const i = axiosInstance

  async function getAnswers() {
    setIsLoading(true)

    try {
      const token = await getToken()

      const formularioid = await getFormId()

      const equipeid = await getEquipeId()

      const res = await i.get(`${BASEURL}${VER_RESPOSTAS_DE_UM_FORMULARIO}/${formularioid as number}/respostas?page=${[page]}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Equipe: equipeid as number,
        },
        data: {},
      })

      if (res.status === 200) {
        setFormData(res.data.content)
        console.log(res.data.content)
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
    getAnswers(currentPage)
  }, [currentPage])

  const nextPage = () => {
    
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Respostas</Text>
        <>
          {
            isLoading ? (
              <View style={styles.loadingView}>
                <Text style={{
                  fontSize: 16,
                  color: "#606060",
                  padding: 8
                }}>
                  Buscando respostas do formulário...
                </Text>
                <LinearProgress
                  style={{ marginVertical: 8 }}
                  color={saveColor}
                />
              </View>
            ) :
              formData.length === 0 ? (
                <View style={styles.loadingView}>
                  <Text style={{
                    fontSize: 16,
                    color: "#606060",
                    padding: 8
                  }}>
                    Nenhuma resposta foi encontrada.
                  </Text>
                </View>
              ) :
                formData &&
                formData.map((form: FormDataRead) => (
                  <ScrollView
                    contentContainerStyle={styles.inputs}
                    key={form.id}>
                    <View>
                      <Text>{form.id}</Text>
                      <Text>{form.descricao}</Text>
                    </View>
                  </ScrollView>
                ))
          }

          {
            formData &&
            formData.map((form: FormDataRead) => (
              <>
                {
                  form.perguntas && form.perguntas.map((question: QuestionDataRead) => (
                    <ScrollView key={question.id}>
                      <Text>{question.tipoResposta}</Text>
                      {
                        question &&
                          question.tipoResposta === 'TEXTO' ? (
                          <CustomInput
                            label={question.descricao}
                            placeholder={question.resposta.resposta}
                            editable={false}
                          />
                        ) :
                          question &&
                            question.tipoResposta === 'INTEIRO' ? (
                            <CustomInput
                              label={question.descricao}
                              placeholder={question.resposta.resposta}
                              editable={false}
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
                                    checked={question.resposta.resposta === true ? true : false}
                                  />
                                  <Checkbox
                                    label="Não"
                                    checkType="circle"
                                    checked={question.resposta.resposta === false ? true : false}
                                  />
                                </View>
                              </View>
                            ) : question &&
                              question.tipoResposta === 'DECIMAL' ? (
                              <CustomInput
                                label={question.descricao}
                                placeholder={question.resposta.resposta}
                                editable={false}
                              />
                            ) :
                              question &&
                                question.tipoResposta === 'MULTIPLA_ESCOLHA' ? ( // tirar 
                                <CustomInput
                                  label={question.descricao}
                                  placeholder={question.resposta.resposta}
                                  editable={false}
                                />
                              ) :
                                question &&
                                  question.tipoResposta === 'CELSIUS' ? (
                                  <CustomInput
                                    label={question.descricao}
                                    placeholder={question.resposta.resposta}
                                    editable={false}
                                  />
                                ) :
                                  question &&
                                    question.tipoResposta === 'QUILOGRAMA' ? (
                                    <CustomInput
                                      label={question.descricao}
                                      placeholder={question.resposta.resposta}
                                      editable={false}
                                    />
                                  ) :
                                    question &&
                                      question.tipoResposta === 'PORCENTAGEM' ? (
                                      <CustomInput
                                        label={question.descricao}
                                        placeholder={question.resposta.resposta}
                                        editable={false}
                                      />
                                    ) :
                                      question &&
                                        question.tipoResposta === 'LITRO' ? (
                                        <CustomInput
                                          label={question.descricao}
                                          placeholder={question.resposta.resposta}
                                          editable={false}
                                        />
                                      ) : ('')
                      }
                    </ScrollView>
                  ))
                }
              </>
            ))}
          <CustomButton
            title="Próxima Página"
            onPress={nextPage}
          />
        </>
      </ScrollView>
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