import { useRouter } from "expo-router"
import { axiosInstance } from "../../../utils/useAxios"
import { getToken } from "../../../hooks/token"
import { AnswerData, getFormId } from "../responder"
import { getEquipeId } from "../../equipes/(tabs)"
import { useEffect, useState } from "react"
import { BASEURL, VER_RESPOSTAS_DE_UM_FORMULARIO } from "../../../utils/endpoints"
import { View, Text } from "react-native"

export default function VerRespostas() {
 const [isLoading, setIsLoading] = useState(false)
 const [answers, setAnswers] = useState<AnswerData[]>([])

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
    setAnswers(res.data.content)
    console.log(res.data.perguntas)
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
  setIsLoading(false)
 }, [])

 return (
  <>
   {answers && answers.map((answer: AnswerData) => (
    <View key={answer.idpergunta}>
     <Text>{answer.resposta}</Text>
    </View>
   ))}
  </>
 )
}