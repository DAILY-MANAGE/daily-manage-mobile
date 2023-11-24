import { RefreshControl, ScrollView, Text, ToastAndroid, View } from "react-native"
import { ListItem, Icon, LinearProgress } from "@rneui/themed"
import { useEffect, useState } from "react"
import { axiosInstance } from '../../utils/useAxios'
import { BASEURL, VER_NOTIFICACOES, ACEITAR_CONVITE, REJEITAR_CONVITE } from "../../utils/endpoints"
import { getToken } from "../../hooks/token"
import CustomButton from "../components/Button"
import { getEquipeId } from "../equipes/(tabs)"
import { saveColor } from "../../utils/constants"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import React from "react"
import { useRouter } from "expo-router"

export interface NotificationsData {
    id?: number,
    mensagem?: string,
    equipeid?: number,
    tipo?: "CONVITE" | "TEXTO",
    horario?: any,
    uri?: "string"
}

export default function Notificacoes() {
    const [notifications, setNotifications] = useState<NotificationsData[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [idconvite, setIdconvite] = useState(0)
    const [refreshing, setRefreshing] = useState(false)
    const [progress, setProgress] = useState(0)

    const router = useRouter()

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
            router.replace("notificacoes")
        }, 500)
    }, [])

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
                setNotifications(res.data.content)
                console.log(`Notificações: ${res.data.content}`)
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

    /* const removeNotification = (notificationId: number) => {
        setNotifications(prevData => prevData.filter(notification => notification.id !== notificationId))
    } */

    const handleAccept = async () => {
        setIsLoading(true)

        const token = await getToken()

        try {
            const res = await i.post(`${BASEURL}${ACEITAR_CONVITE}/${idconvite}/aceitar`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    data: {},
                })
            if (res.status === 200) {
                setIsLoading(false)
                // removeNotification(idconvite)
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
        }
    }

    const handleRefuse = async () => {
        setIsLoading(true)

        const token = await getToken()

        try {
            const res = await i.post(`${BASEURL}${REJEITAR_CONVITE}/${idconvite}/rejeitar`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    data: {},
                })
            if (res.status === 200) {
                setIsLoading(false)
                //removeNotification(idconvite)
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
        }
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
        <>
            {
                isLoading ? (
                    <ScrollView
                        style={{
                            height: "100%",
                            width: "100%",
                            padding: 16,
                            backgroundColor: "#FFFFFF"
                        }}
                        refreshControl={
                            <RefreshControl
                                progressBackgroundColor={"#262626"}
                                colors={[saveColor]}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <Text style={{
                            fontSize: 16,
                            color: "#606060",
                            padding: 8
                        }}>
                            Carregando notificações...
                        </Text>
                        <LinearProgress style={{ marginVertical: 8 }} color={saveColor} />
                    </ScrollView>
                ) : notifications.length === 0 ? (
                    <ScrollView
                        style={{
                            height: "100%",
                            width: "100%",
                            backgroundColor: "#FFFFFF"
                        }}
                        refreshControl={
                            <RefreshControl
                                progressBackgroundColor={"#262626"}
                                colors={[saveColor]}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }>
                        <Text style={{
                            fontSize: 16,
                            color: "#606060",
                            padding: 8
                        }}>
                            Nenhuma notificação encontrada.
                        </Text>
                    </ScrollView>
                ) :
                    notifications &&
                    notifications.map((notifications: NotificationsData) => (
                        <ScrollView
                            key={notifications.id}
                            refreshControl={
                                <RefreshControl
                                    progressBackgroundColor={"#262626"}
                                    colors={[saveColor]}
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            contentContainerStyle={{
                                padding: 16,
                                height: "100%",
                                width: "100%",
                                backgroundColor: "#FFFFFF"
                            }}
                        >
                            <ListItem containerStyle={{ borderWidth: 1, borderRadius: 8, borderColor: "#c1c1c1", shadowColor: "#ccc", elevation: 4 }}>
                                <ListItem.Content style={{ flexDirection: "column", gap: 8 }}>
                                    <Text style={{ flexWrap: "wrap", fontSize: 18, fontWeight: "bold" }}>
                                        {notifications.mensagem}
                                    </Text>
                                    <Text style={{ flexWrap: "wrap", fontSize: 16, color: "#606060" }}>
                                        {notifications.horario}
                                    </Text>
                                    {
                                        notifications &&
                                            notifications.tipo === 'CONVITE' ? (
                                            <View style={{
                                                flexDirection: "row",
                                                width: "100%",
                                                justifyContent: "space-between",
                                                height: "auto"
                                            }}
                                            >
                                                <CustomButton
                                                    icon={() => (<FontAwesome name="close" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />)}
                                                    buttonStyle={{
                                                        width: 156,
                                                        height: "auto",
                                                    }}
                                                    color="red"
                                                    onPress={() => {
                                                        setIdconvite(notifications.id),
                                                            handleRefuse()
                                                    }}
                                                    title="Recusar" />
                                                <CustomButton
                                                    icon={() => (<FontAwesome name="check" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />)}
                                                    buttonStyle={{
                                                        height: "auto",
                                                        width: 156,
                                                    }}
                                                    color={saveColor}
                                                    onPress={() => {
                                                        setIdconvite(notifications.id),
                                                            handleAccept()
                                                    }}
                                                    title="Aceitar"
                                                />
                                            </View>
                                        ) : ('')}
                                </ListItem.Content>
                            </ListItem>
                        </ScrollView>
                    ))
            }
        </>
    )
}
