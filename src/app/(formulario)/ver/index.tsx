import { useRouter } from "expo-router"
import { axiosInstance } from "../../../utils/useAxios"
import { getToken } from "../../../hooks/token"
import { AnswerData, getFormId } from "../responder"
import { getEquipeId } from "../../equipes/(tabs)"
import { useEffect, useState } from "react"
import { BASEURL, VER_RESPOSTAS_DE_UM_FORMULARIO } from "../../../utils/endpoints"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { FormData, QuestionData } from "../../../interfaces/DadosFormulario"
import CustomInput from "../../components/Input"
import Checkbox from "../../components/Checkbox"
import { LinearProgress } from "@rneui/themed"
import { saveColor } from "../../../utils/constants"

export default function VerRespostas() {
 const [isLoading, setIsLoading] = useState(false)
 const [formData, setFormData] = useState<FormData[]>([])

 const i = axiosInstance

 async function getAnswers() {
  setIsLoading(true)

  try {
   const token = await getToken()

   const formularioid = await getFormId()

   const equipeid = await getEquipeId()

   const res = await i.get(`${BASEURL}${VER_RESPOSTAS_DE_UM_FORMULARIO}/${formularioid as number}/respostas`, {
    headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,
     Equipe: equipeid as number,
    },
    data: {},
   })

   if (res.status === 200) {
    setFormData(res.data.content)
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
 }, [])

 return (
  <ScrollView contentContainerStyle={styles.container}>
   {formData && formData.map((form: FormData) => (
    <View
     style={styles.inputs}
     key={form.id}>
     {form.perguntas.map((question: QuestionData) => (
      <>
       <View key={question.id}>
        <Text>{question.tiporesposta}</Text>
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
          form.perguntas.length === 0 ? (
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
           question.tiporesposta === "STRING" ? (
            <CustomInput
             label={question.descricao}
             placeholder={question.resposta.resposta}
            />
           ) :
            question &&
             question.tiporesposta === 'PERCENT' ? (
             <CustomInput
              label={question.descricao}
              placeholder={question.resposta.resposta}
             />
            ) :
             question &&
              question.tiporesposta === 'BOOLEAN' ? (
              <>
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
              </>
             ) : question &&
              question.tiporesposta === "CELSIUS" ? (
              <CustomInput
               label={question.descricao}
               placeholder={question.resposta.resposta}
              />
             ):
               question &&
                question.tiporesposta === 'INTEGER' ? (
                <CustomInput
                 label={question.descricao}
                 placeholder={question.resposta.resposta}
                />
               ) :
                question &&
                 question.tiporesposta === 'KILOGRAM' ? (
                 <CustomInput
                  label={question.descricao}
                  placeholder={question.resposta.resposta}
                 />
                ) :
                 question &&
                  question.tiporesposta === 'DECIMAL' ? (
                  <CustomInput
                   label={question.descricao}
                   placeholder={question.resposta.resposta}
                  />
                 ) :
                  question &&
                   question.tiporesposta === 'LITER' ? (
                   <CustomInput
                    label={question.descricao}
                    placeholder={question.resposta.resposta}
                   />
                  ) : ('')}
       </View>
      </>
     ))}
    </View >
   ))}
  </ScrollView>
 )
}

const styles = StyleSheet.create({
 inputs: {
  backgroundColor: "white",
  paddingBottom: 16,
  height: "100%",
  flexDirection: "column",
  width: "100%",
 },
 container: {
  backgroundColor: "white",
  paddingBottom: 16,
  paddingHorizontal: 24,
  height: "100%",
  justifyContent: "space-between",
 },
 loadingView: {
  width: "100%",
  height: "100%",
  padding: 8
 },
})