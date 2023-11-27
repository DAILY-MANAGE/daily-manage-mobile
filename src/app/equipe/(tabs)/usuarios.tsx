import {
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
import { useCallback, useEffect, useState } from "react"
import { getEquipeId } from "../../equipes/(components)/CardCreatedTeam"
import { getToken } from "../../../hooks/token"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { axiosInstance } from "../../../utils/useAxios"
import CustomButton from "../../components/Button"
import {
  CheckBox, LinearProgress, Overlay, SearchBar, Text
} from "@rneui/themed"
import CustomInput from "../../components/Input"
import CustomSearchBar from "../../components/SearchBar/index"
import React from "react"
import { useRouter } from "expo-router"
import { saveColor } from "../../../utils/constants"

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
  {
    id: 7,
    name: "Administrador",
    value: "ADMINISTRADOR",
  },
]

export default function Users() {
  const [newUser, setNewUser] = useState<DadosUsuario[]>([])
  const [teamUsers, setTeamUsers] = useState<DadosUsuario[]>([])
  const [allUsers, setAllUsers] = useState<DadosUsuario[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [search, setSearch] = useState("")
  const [usrId, setUsrId] = useState(0)
  const [usrName, setUsrName] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(["VISUALIZAR_FORMULARIO"])
  const [progress, setProgress] = useState(0)

  const router = useRouter()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      router.replace("equipe/(tabs)/usuario")
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
        toggleOverlay()
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
      <CustomSearchBar placeholder="Pesquisar membro da equipe" value={search} onChangeText={setSearch} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CustomButton buttonStyle={{ marginBottom: 8 }} onPress={toggleOverlay} title="+ Convidar para a equipe" />

        <View style={{ paddingLeft: 8, paddingBottom: 8 }}>
          <Text style={{ fontSize: 16, color: "#555555", fontWeight: "600" }}>
            Membros da equipe:
          </Text>
        </View>

        {
          isLoading ?
            (
              <>
                <Text style={{ fontSize: 16, color: "#606060", padding: 8 }}>
                  Buscando membros da equipe...
                </Text>
                <LinearProgress style={{ marginVertical: 8 }} color={saveColor} />
              </>
            ) :
            teamUsers &&
              teamUsers.length === 0 ? (
              <Text style={{
                fontSize: 16,
                color: "#606060",
                padding: 8
              }}>
                Nenhuma membro foi encontrado.
              </Text>
            ) :
              teamUsers &&
              teamUsers.map((user: DadosUsuario) => (
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
        <View style={styles.header}>
          <Text style={styles.title}>Convidar usuários</Text>
          <FontAwesome name="close" size={24} onPress={toggleOverlay} />
        </View>
        <SearchBar
          lightTheme={true}
          style={styles.searchBar}
          inputStyle={styles.inputStyle}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          leftIconContainerStyle={styles.leftIcon}
          placeholder="Nome do usuário"
          value={search}
          onChangeText={handleSearch}
        />
        <ScrollView contentContainerStyle={styles.searchResults}>
          {
            search &&
            filteredUsers.map((usr: DadosUsuario) => (
              <Pressable
                key={usr.id}
                onPress={() => {
                  setUsrId(usr.id),
                    setUsrName(usr.nome),
                    console.log(usr.id),
                    setSelectedUserId(usr.id),
                    setSelectedUser(usr.usuario)
                }}
                style={[
                  styles.userItem,
                  usr.id === selectedUserId && styles.selectedUserItem,
                ]}
              >
                <Text style={[
                  styles.userData,
                  usr.id === selectedUserId && styles.selectedUserData,
                ]}>{usr.nome}</Text>
                <Text style={[
                  styles.userData,
                  usr.id === selectedUserId && styles.selectedUserData,
                ]}>ID: {usr.id}</Text>
              </Pressable>
            ))
          }
        </ScrollView>
        <Text style={{ color: "#363636", paddingLeft: 8, paddingBottom: 8, fontSize: 18 }}>Permissões do usuário na equipe:</Text>
        {permPreset &&
          permPreset.map((perm: PermPreset) => (
            <View
              style={styles.permissionItem}
              key={perm.id}
            >
              <CheckBox
                size={24}
                checked={selectedPermissions.includes(perm.value)}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor={saveColor}
                containerStyle={{ padding: 0, margin: 0, paddingBottom: 8 }}
                wrapperStyle={{ padding: 0, margin: 0, height: "auto", width: "auto" }}
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
              <Text style={{ fontSize: 16, fontWeight: "800" }}>{perm.name}</Text>
            </View>
          ))}
        {
          selectedUser ? (
            <CustomButton onPress={addUser} titleStyle={{ fontWeight: 900 }} color={saveColor} title="CONVIDAR" />
          ) : (
            <CustomButton onPress={() => {}} titleStyle={{ fontWeight: 600 }} color="#ccc" title="Convidar" />
          )
          }
      </Overlay>
    </>
  )
}

const styles = StyleSheet.create({
  userData: {
    color: "black"
  },
  selectedUserData: {
    color: "white",
    fontWeight: "bold"
  },
  searchBar: {
    padding: 8,
  },
  inputStyle: {
    backgroundColor: "#FAFAFA",
  },
  containerStyle: {
    borderRadius: 32,
    margin: 0,
    padding: 0,
    backgroundColor: "#FFFFFF",
  },
  inputContainerStyle: {
    backgroundColor: "#FAFAFA",
    borderRadius: 64,
    borderWidth: 1,
    shadowOpacity: 0,
    elevation: 0,
  },
  leftIcon: {
    paddingLeft: 8,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 8,
    paddingBottom: 8
  },
  searchResults: {
    justifyContent: "center",
    width: "100%",
    maxHeight: 150,
    borderRadius: 8,
    borderColor: "#c5c5c5",
    padding: 4,
    paddingRight: 8,
    paddingLeft: 8
  },
  permissionItem: {
    height: "auto",
    flexDirection: "row",
    padding: 0,
    margin: 0,
    width: "100%",
  },
  userItem: {
    padding: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#c5c5c5",
  },
  selectedUserItem: {
    backgroundColor: saveColor,
    color: "white"
  },
  overlayStyle: {
    borderRadius: 16,
    padding: 16,
    width: "90%",
    height: "auto",
    margin: 0,
    gap: 4,
  },
  modal__title: {
    paddingTop: 8,
    textAlign: "center",
    fontSize: 20,
    textDecorationLine: "none"
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
    padding: 16,
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
