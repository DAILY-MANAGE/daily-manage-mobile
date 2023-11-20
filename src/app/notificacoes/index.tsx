import { Text } from "react-native"
import { ListItem, Icon } from "@rneui/themed"
import { useEffect, useState } from "react"
import { axiosInstance } from '../../utils/useAxios'
import { BASEURL, VER_NOTIFICACOES } from "../../utils/endpoints"
import { getToken } from "../../hooks/token"
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

    async function getNotifications() {
        setIsLoading(true)

        const token = await getToken()

        const i = axiosInstance

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

    return (
        <>
            {data ? data.map((data: NotificationsData) => (
                <ListItem key={data.id}>
                    <Icon name="inbox" type="material-community" color="grey" />
                    <ListItem.Content>
                        <ListItem.Title>{data.mensagem}</ListItem.Title>
                    </ListItem.Content>
                    <Text>{data.horario}</Text>
                </ListItem>
            )) : (<Text>Sem notificações.</Text>)}
        </>
    )
}
