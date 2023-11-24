import { useRouter } from "expo-router"
import { axiosInstance } from "../../../utils/useAxios"
import { getToken } from "../../../hooks/token"
import { AnswerData, getFormId } from "../responder"
import { getEquipeId } from "../../equipes/(tabs)"
import { useEffect, useState } from "react"
import { BASEURL, VER_RESPOSTAS_DE_UM_FORMULARIO } from "../../../utils/endpoints"
import { View, Text } from "react-native"
import { FormData, QuestionData } from "../../../interfaces/DadosFormulario"

export default function VerRespostas() {
 const [isLoading, setIsLoading] = useState(false)
 const [formData, setFormData] = useState<FormData[]>([])

 const i = axiosInstance

 const router = useRouter()

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
  <View>
   {formData && formData.map((form: FormData) => (
    <View key={form.id}>
     {form.perguntas.map((question: QuestionData) => (
      <View key={question.id}>
       <Text>{question.descricao}</Text>
       <Text>{question.resposta.resposta}</Text>
      </View>
     ))}
    </View>
   ))}
  </View>
 )
}