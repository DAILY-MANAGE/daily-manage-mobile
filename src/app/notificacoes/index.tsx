import { Text, ToastAndroid, View } from "react-native"
import { ListItem, Icon } from "@rneui/themed"
import { useEffect, useState } from "react"
import { axiosInstance } from '../../utils/useAxios'
import { BASEURL, VER_NOTIFICACOES, ACEITAR_CONVITE, REJEITAR_CONVITE } from "../../utils/endpoints"
import { getToken } from "../../hooks/token"
import CustomButton from "../components/Button"
import { getEquipeId } from "../equipes/(tabs)"
export interface NotificationsData {
    id?: number,
    mensagem?: string,
    equipeid?: number,
    tipo?: "CONVITE" | "TEXTO",
    horario?: any,
    uri?: "string"
}

export default function Notificacoes() {
    const [data, setData] = useState<NotificationsData[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [id, setId] = useState(0)

    const i = axiosInstance

    async function getNotifications() {
        setIsLoading(true)

        const token = await getToken()

        try {
            const res = await i.get(`${BASEURL}${VER_NOTIFICACOES}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    data: {},
                })

            if (res.status === 200) {
                setData(res.data.content)
                console.log(data)
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
        getNotifications()
    }, [])

    const handleAccept = async () => {
        setIsLoading(true)

        const token = await getToken()

        const equipeid = await getEquipeId()

        console.log(`\nTOKEN: ${token},\n Equipe ID: ${equipeid},\n Convite ID: ${id}`)
        console.log(`\n${BASEURL}${ACEITAR_CONVITE}/${id}/aceitar`)
        try {
            const res = await i.post(`${BASEURL}${ACEITAR_CONVITE}/${id}/aceitar`,
                {
                    
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    data: {},
                })
            if (res.status === 200) {
                setIsLoading(false)
                ToastAndroid.show(
                    `Você ingressou na equipe!`,
                    ToastAndroid.SHORT
                )
            } else {
                throw new Error(`${JSON.stringify(res.data)}`)
            }
        } catch (err) {
            console.log(err)
            setIsLoading(false)
            if (err.response && err.response.status === 403) {
                const errorsArray = err.response.data.errors
                console.log(errorsArray)
            }
        }
    }

    const handleRefuse = async () => {
        setIsLoading(true)

        const token = await getToken()

        const equipeid = await getEquipeId()

        console.log(id)

        try {
            const res = await i.post(`${BASEURL}${REJEITAR_CONVITE}/${id}/rejeitar`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    data: {},
                })
            if (res.status === 200) {
                setIsLoading(false)
                ToastAndroid.show(
                    `Convite recusado.`,
                    ToastAndroid.SHORT
                )
            } else {
                throw new Error(`${JSON.stringify(res.data)}`)
            }
        } catch (err) {
            console.log(err)
            setIsLoading(false)
            if (err.response && err.response.status === 403) {
                const errorsArray = err.response.data.errors
                console.log(errorsArray)
            }
        }
    }

    return (
        <>
            {data ? data.map((data: NotificationsData) => (
                <ListItem key={data.id}>
                    <CustomButton title="set id" onPress={() => setId(data.id)} />
                    <Icon name="inbox" type="material-community" color="grey" />
                    <ListItem.Content>
                        <ListItem.Title>{data.mensagem}</ListItem.Title>
                        <Text>{data.horario}</Text>
                        {data && data.tipo === 'CONVITE' ? (
                            <View style={{ flexDirection: "row", gap: 16 }}>
                                <CustomButton onPress={() => handleAccept()} title="Aceitar" />
                                <CustomButton onPress={() => handleRefuse()} title="Recusar" />
                            </View>
                        ) : ('')}
                    </ListItem.Content>
                </ListItem>
            )) : (<Text>Sem notificações.</Text>)}
        </>
    )
}
