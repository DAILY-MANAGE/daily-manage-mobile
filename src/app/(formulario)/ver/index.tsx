import { axiosInstance } from "../../../utils/useAxios"
import { getToken } from "../../../hooks/token"
import { getFormId } from "../responder"
import { getEquipeId } from "../../equipes/(components)/CardCreatedTeam"
import { useCallback, useEffect, useState } from "react"
import { BASEURL, VER_RESPOSTAS_DE_UM_FORMULARIO } from "../../../utils/endpoints"
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native"
import { FormDataRead, QuestionDataRead } from '../../../interfaces/DadosFormulario'
import CustomInput from "../../components/Input"
import Checkbox from "../../components/Checkbox"
import { Divider, LinearProgress } from "@rneui/themed"
import { saveColor } from "../../../utils/constants"
import CustomButton from "../../components/Button"
import { useRouter } from "expo-router"

export default function VerRespostas() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormDataRead[]>([])
  const [isLast, setIsLast] = useState(false)
  const [isFirst, setIsFirst] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const router = useRouter()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      router.replace("(formulario)/ver")
    }, 500)
  }, [])

  const nextPage = () => {
    setPageNumber(pageNumber + 1)
  }

  const previousPage = () => {
    setPageNumber(pageNumber - 1)
  }

  const i = axiosInstance

  async function getAnswers() {
    setIsLoading(true)

    try {
      const token = await getToken()

      const formularioid = await getFormId()

      const equipeid = await getEquipeId()

      const res = await i.get(`${BASEURL}${VER_RESPOSTAS_DE_UM_FORMULARIO}/${formularioid as number}/respostas?size=1&page=${pageNumber}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Equipe: equipeid as number,
        },
        data: {},
      })

      if (res.status === 200) {
        setFormData(res.data.content)
        setIsLast(res.data.last)
        setIsFirst(res.data.first)
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
    getAnswers()
  }, [pageNumber])

  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressBackgroundColor={"#262626"}
        colors={[saveColor]} />
    } contentContainerStyle={styles.wrapper__content} style={styles.wrapper} >
      <ScrollView contentContainerStyle={styles.container}>
        {isLoading ? (
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
        ) : formData.length === 0 ? (
          <View style={styles.loadingView}>
            <Text style={{
              fontSize: 16,
              color: "#606060",
              padding: 8
            }}>
              Nenhuma resposta foi encontrada.
            </Text>
          </View>
        ) : (
          formData.map((form: FormDataRead) => (
            <ScrollView style={{ height: "100%", width: "100%" }} key={form.id}>
              <ScrollView
                contentContainerStyle={styles.inputs__container}
                key={`form-${form.id}`}
              >
                <View style={styles.cardDadosForm}>
                  <Text style={styles.title}>Resposta {form.id}</Text>
                  <Text style={{ fontSize: 16, fontWeight: "400", color: "#666666", fontStyle: "italic" }}>Enviado por: {form.usuario.usuario}</Text>
                </View>
              </ScrollView>

              {form.perguntas &&
                form.perguntas.map((question: QuestionDataRead, index: number) => (
                  <ScrollView contentContainerStyle={styles.inputs} key={`question-${form.id}-${index}`}>
                    {question &&
                      question.tipoResposta === 'TEXTO' ? (
                      <CustomInput
                        label={question.descricao}
                        placeholder={question.resposta.resposta}
                        editable={false}
                      />
                    ) : question &&
                      question.tipoResposta === 'INTEIRO' ? (
                      <CustomInput
                        label={question.descricao}
                        placeholder={question.resposta.resposta}
                        editable={false}
                      />
                    ) : question &&
                      question.tipoResposta === 'BOOLEANO' ? (
                      <View style={styles.boolean__container}>
                        <Text style={styles.boolean__label}>
                          {question.descricao}
                        </Text>
                        <View>
                          {question && question.resposta && question.resposta.resposta === 'Sim' ? (
                            <>
                              <Checkbox
                                label="Sim"
                                checkType="circle"
                                checked={true}
                              />
                              <Checkbox
                                label="Não"
                                checkType="circle"
                                checked={false}
                              />
                            </>
                          ) : (
                            <>
                              <Checkbox
                                label="Sim"
                                checkType="circle"
                                checked={false}
                              />
                              <Checkbox
                                label="Não"
                                checkType="circle"
                                checked={true}
                              />
                            </>
                          )}
                        </View>
                      </View>
                    ) : question &&
                      question.tipoResposta === 'DECIMAL' ? (
                      <CustomInput
                        label={question.descricao}
                        placeholder={question.resposta.resposta}
                        editable={false}
                      />
                    ) : question &&
                      question.tipoResposta === 'MULTIPLA_ESCOLHA' ? (
                      <CustomInput
                        label={question.descricao}
                        placeholder={question.resposta.resposta}
                        editable={false}
                      />
                    ) : question &&
                      question.tipoResposta === 'CELSIUS' ? (
                      <CustomInput
                        label={question.descricao}
                        placeholder={question.resposta.resposta}
                        editable={false}
                      />
                    ) : question &&
                      question.tipoResposta === 'QUILOGRAMA' ? (
                      <CustomInput
                        label={question.descricao}
                        placeholder={question.resposta.resposta}
                        editable={false}
                      />
                    ) : question &&
                      question.tipoResposta === 'PORCENTAGEM' ? (
                      <CustomInput
                        label={question.descricao}
                        placeholder={question.resposta.resposta}
                        editable={false}
                      />
                    ) : question &&
                      question.tipoResposta === 'LITRO' ? (
                      <CustomInput
                        label={question.descricao}
                        placeholder={question.resposta.resposta}
                        editable={false}
                      />
                    ) : ('')}
                  </ScrollView>
                ))}
            </ScrollView>
          ))
        )}
      </ScrollView>
      <View style={styles.footer}>
        {isFirst && isLast ? (
          ''
        ) : isFirst && !isLast ? (
          <View style={{ flexDirection: 'row', justifyContent: "flex-end", width: "100%" }}>
            <CustomButton
              buttonStyle={{ width: "50%", alignSelf: "flex-end" }}
              title=">>"
              onPress={() => { nextPage() }}
            />
          </View>
        ) : !isFirst && !isLast ? (
          <View style={{ flexDirection: 'row', justifyContent: "space-between", width: "100%" }}>
            <CustomButton
              title="<<"
              onPress={() => { previousPage() }}
              buttonStyle={{ width: "50%", alignSelf: "flex-start" }}
            />
            <CustomButton
              title=">>"
              onPress={() => { nextPage() }}
              buttonStyle={{ width: "50%", alignSelf: "flex-end" }}
            />
          </View>
        ) : !isFirst && isLast ? (
          <View style={{ flexDirection: 'row', justifyContent: "space-between", width: "100%" }}>
            <CustomButton
              title="<<"
              onPress={() => { previousPage() }}
              buttonStyle={{ width: "50%", alignSelf: "flex-start" }}
            />
          </View>
        ) : (
          ''
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputs__container: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 8,
    height: "auto",
    flexDirection: "column",
    width: "100%",
  },
  wrapper__content: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between"
  },
  title__resposta: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDadosForm: {
    width: "100%",
    height: "auto",
    paddingHorizontal: 8,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  wrapper: {
    backgroundColor: "#FFFFFF",
    height: "100%",
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
    gap: 16
  },
})