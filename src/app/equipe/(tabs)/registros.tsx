import { Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { axiosInstance } from '../../../utils/useAxios'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { getToken } from '../../../hooks/token'
import { getEquipeId } from '../../equipes/(components)/CardCreatedTeam'
import { BASEURL } from '../../../utils/endpoints'
import { LinearProgress } from '@rneui/themed'
import { deleteColor, saveColor } from '../../../utils/constants'

interface TeamLogData {
 id: number,
 acao: string,
 horario: string,
 usuario: {
  id: number,
  nome: string,
  usuario: string,
  email: string
 }
 equipe: {
  id: number,
  nome: string
 }
}

export default function Configuracoes() {
 const [isLoading, setIsLoading] = useState(false)
 const [data, setData] = useState<TeamLogData[]>([])
 const [refreshing, setRefreshing] = useState(false)

 const onRefresh = useCallback(() => {
  setRefreshing(true)
  setTimeout(() => {
   setRefreshing(false)
   router.replace("equipe/(tabs)/registros")
  }, 500)
 }, [])

 const i = axiosInstance

 const router = useRouter()

 async function getLogs() {
  setIsLoading(true)

  try {
   const token = await getToken()

   const equipeid = await getEquipeId()

   const res = await i.get(`${BASEURL}/equipes/registros`, {
    headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,
     Equipe: equipeid as number,
    },
    data: {},
   })

   if (res.status === 200) {
    setData(res.data.content)
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
  getLogs()
 }, [])

 return (
  <ScrollView style={{ height: "100%", backgroundColor: "#FFFFFF" }} contentContainerStyle={styles.container} refreshControl={
   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressBackgroundColor={"#262626"}
    colors={[saveColor]} />
  }>
   {isLoading ?
    (
     <>
      <Text style={{ fontSize: 16, color: "#606060", padding: 8 }}>
       Buscando registros da equipe...
      </Text>
      <LinearProgress style={{ marginVertical: 8 }} color={saveColor} />
     </>
    ) :
    data && data.length === 0 ? (
     <Text style={{ fontSize: 16, color: "#606060", padding: 8 }}>Nenhuma equipe foi encontrada.</Text>
    ) :
     data &&
     data.map((log: TeamLogData) => (
      <View
       key={log.id}
       style={styles.equipeContainer}
      >
       <Text style={styles.title}>{log.acao}</Text>
       <Text style={styles.time}>{log.horario}</Text>
       <Text style={styles.user}>{log.usuario.nome}</Text>
      </View>
     ))
   }
  </ScrollView>
 )
}

const styles = StyleSheet.create({
 container: {
  height: "auto",
  width: "100%",
  backgroundColor: "#FFFFFF",
  padding: 16,
  flexDirection: "column",
  gap: 16
 },
 equipeContainer: {
  padding: 8,
  flexDirection: "column",
  gap: 4,
  height: "auto",
  width: "100%",
  borderWidth: 1,
  borderColor: "#c5c5c5",
  borderRadius: 8
 },
 title: {
  fontSize: 20,
  fontWeight: "900",
 },
 time: {
  fontSize: 18,
  fontWeight: "400",
  color: saveColor,
 },
 user: {
  color: "orange",
  fontSize: 18,
  fontWeight: "400",
 },
})
