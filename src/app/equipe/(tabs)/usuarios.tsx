import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ToastAndroid,
  RefreshControl,
  ScrollView,
} from "react-native"
import {
  ADICONAR_USUARIO_A_EQUIPE,
  BASEURL,
  FILTRAR_USUARIOS,
  FILTRAR_USUARIOS_DA_EQUIPE,
} from "../../../utils/endpoints"
import { useEffect, useState } from "react"
import { getEquipeId } from "../../equipes/(tabs)"
import { getToken } from "../../../hooks/token"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { axiosInstance } from "../../../utils/useAxios"
import CustomButton from "../../components/Button"
import { CheckBox, Overlay } from "@rneui/themed"
import CustomInput from "../../components/Input"
import CustomSearchBar from "../../components/SearchBar/index"
import React from "react"
import { useRouter } from "expo-router"

export interface DadosUsuario {
  id?: number
  usuario?: string
  nome?: string
}

interface PermPreset {
  id: number
  name: string
  value: string
}

const permPreset: PermPreset[] = [
  {
    id: 1,
    name: "Visualizar",
    value: "VISUALIZAR_FORMULARIO",
  },
  {
    id: 2,
    name: "Criar",
    value: "CRIAR_FORMULARIO",
  },
  {
    id: 3,
    name: "Excluir",
    value: "EXCLUIR_FORMULARIO",
  },
  {
    id: 4,
    name: "Editar",
    value: "EDITAR_FORMULARIO",
  },
  {
    id: 5,
    name: "Responder",
    value: "RESPONDER_FORMULARIO",
  },
  {
    id: 6,
    name: "Ver respostas",
    value: "VER_FORMULARIO_RESPONDIDO",
  },
]

export default function Users() {
  const [newUser, setNewUser] = useState<DadosUsuario[]>([])
  const [teamUsers, setTeamUsers] = useState<DadosUsuario[]>([])
  const [allUsers, setAllUsers] = useState<DadosUsuario[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [perm, setPerm] = useState("")
  const [search, setSearch] = useState("")
  const [usrId, setUsrId] = useState(0)
  const [usrName, setUsrName] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(["VISUALIZAR_FORMULARIO"])

  const router = useRouter()

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      router.replace("equipe")
    }, 500)
  }, [])

  const handleSearch = (text: string) => {
    setSearch(text)
  }

  const toggleOverlay = () => {
    setVisible(!visible)
    resetState()
  }

  const i = axiosInstance

  async function getTeamUsers() {
    setIsLoading(true)
    try {
      const token = await getToken()

      const equipeid = await getEquipeId()

      const res = await i.get(`${BASEURL}${FILTRAR_USUARIOS_DA_EQUIPE}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Equipe: equipeid as number,
        },
        data: {},
      })

      if (res.status === 200) {
        setTeamUsers(res.data.content)
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
    getTeamUsers()
  }, [])

  async function getAllUsers() {
    setIsLoading(true)
    console.log(allUsers)
    try {
      const token = await getToken()

      const equipeid = await getEquipeId()

      const res = await i.get(`${BASEURL}${FILTRAR_USUARIOS}?nome=${search}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Equipe: equipeid as number,
        },
        data: {},
      })

      if (res.status === 200) {
        setAllUsers(res.data.content)
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
    getAllUsers()
  }, [search])

  const addUser = async () => {
    setIsLoading(!isLoading)

    const token = await getToken()

    const equipeid = await getEquipeId()

    try {
      const res = await i.post(
        `${BASEURL}${ADICONAR_USUARIO_A_EQUIPE}/${usrId}`,
        {
          permissoes: [...selectedPermissions],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Equipe: equipeid as number,
          },
          data: {},
        }
      )

      if (res.status === 200) {
        setNewUser(res.data.content)
        ToastAndroid.show(
          `Usuário ${usrName} convidado para a equipe`,
          ToastAndroid.SHORT
        )
        resetState()
        setIsLoading(!isLoading)
      } else {
        throw new Error(`${JSON.stringify(res.data)}`)
      }
    } catch (err) {
      console.log(err)
      setIsLoading(!isLoading)
    }
  }

  const filteredUsers = allUsers.filter((usr) =>
    search ? usr.nome.toLowerCase().includes(search.toLowerCase()) : true
  )

  const resetState = () => {
    setUsrId(0)
    setUsrName("")
    setSearch("")
    setSelectedUserId(null)
    setSelectedUser('')
    setSelectedPermissions(["VISUALIZAR_FORMULARIO"])
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ padding: 8 }}>
          <Text style={{ fontSize: 16, color: "#555555", fontWeight: "600" }}>
            Membros da equipe:
          </Text>
        </View>
        <CustomButton buttonStyle={{ marginBottom: 8 }} onPress={toggleOverlay} title="+ Adicionar membro" />

        {teamUsers.map((user: DadosUsuario) => (
          <View key={user.id} style={styles.card}>
            <View style={styles.imgContainer}>
              <FontAwesome name="user-circle-o" size={48} color="#ccc" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{user.nome}</Text>
              <Text style={styles.subtitle}>Vulgo: {user.usuario}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <Overlay
        overlayStyle={styles.overlayStyle}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <Text style={styles.modal__title}>Adicionar membros à equipe</Text>
        <CustomSearchBar
          placeholder="Nome do usuário"
          value={search}
          onChangeText={handleSearch}
        />
        <ScrollView style={styles.searchResults}>
          {search.length === 0 ? (
            <Text>Nenhum usuário foi encontrado...</Text>
          ) : (
            search &&
            filteredUsers.map((usr: DadosUsuario) => (
              <Pressable
                key={usr.id}
                onPress={() => {
                  setUsrId(usr.id),
                    setUsrName(usr.nome),
                    console.log(usr.id),
                    setSelectedUserId(usr.id),
                    setSearch("")
                  setSelectedUser(usr.usuario)
                }}
                style={[
                  styles.userItem,
                  usr.id === selectedUserId && styles.selectedUserItem,
                ]}
              >
                <Text>{usr.nome}</Text>
                <Text>ID: {usr.id}</Text>
              </Pressable>
            ))
          )}
        </ScrollView>
        {selectedUser ? (<Text>{selectedUser}</Text>) : ('')}
        {permPreset &&
          permPreset.map((perm: PermPreset) => (
            <View
              style={styles.permissionItem}
              key={perm.id}
            >
              <CheckBox
                checked={selectedPermissions.includes(perm.value)}
                onPress={() => {
                  //                   if (perm.value === "VISUALIZAR_FORMULARIO") return deixa visualizar como default
                  setSelectedPermissions((prevPermissions) => {
                    if (prevPermissions.includes(perm.value)) {
                      return prevPermissions.filter((p) => p !== perm.value)
                    }
                    return [...prevPermissions, perm.value]
                  })
                }}
              />
              <Text>{perm.name}</Text>
            </View>
          ))}
        <CustomButton onPress={addUser} title="+ Adicionar" />
      </Overlay>
    </>
  )
}

const styles = StyleSheet.create({
  searchResults: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -50 }],
    width: '90%',
    maxHeight: 150,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#c5c5c5",
    marginTop: 8,
  },
  permissionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#c5c5c5",
  },
  userItem: {
    padding: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#c5c5c5",
  },
  selectedUserItem: {
    backgroundColor: "#e0e0e0",
  },
  overlayStyle: {
    borderRadius: 16,
    padding: 16,
    width: "90%",
    height: "auto",
    margin: 0,
    gap: 16,
  },
  modal__title: {
    paddingTop: 8,
    textAlign: "center",
    fontSize: 20,
  },
  textContainer: {
    flexDirection: "column",
  },
  imgContainer: {
    height: "auto",
    width: "auto",
    backgroundColor: "#fcfcfc",
    borderRadius: 25,
  },
  container: {
    height: "100%",
    width: "100%",
    padding: 8,
    backgroundColor: "white",
  },
  card: {
    marginBottom: 8,
    height: "auto",
    width: "100%",
    padding: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#c5c5c5",
    flexDirection: "row",
    gap: 16,
    shadowColor: "#c5c5c5",
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#666564",
  },
})
