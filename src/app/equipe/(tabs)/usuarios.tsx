import { Text, View, StyleSheet, Pressable, ToastAndroid } from "react-native"
import { ADICONAR_USUARIO_A_EQUIPE, BASEURL, FILTRAR_USUARIOS, FILTRAR_USUARIOS_DA_EQUIPE } from "../../../utils/endpoints"
import { useEffect, useState } from "react"
import { getEquipeId } from "../../equipes/(tabs)"
import { getToken } from "../../../hooks/token"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { axiosInstance } from "../../../utils/useAxios"
import CustomButton from "../../components/Button"
import { Overlay } from "@rneui/themed"
import CustomInput from "../../components/Input"
import CustomSearchBar from '../../components/SearchBar/index'

export interface DadosUsuario {
  id?: number
  usuario?: string
  nome?: string
}

interface PermPreset {
  id: number,
  name: string,
  value: string
}

const permPreset: PermPreset[] = [
  {
    id: 1,
    name: "Visualizar",
    value: "VISUALIZAR_FORMULARIO"
  },
  {
    id: 2,
    name: "Criar",
    value: "CRIAR_FORMULARIO"
  },
  {
    id: 3,
    name: "Excluir",
    value: "EXCLUIR_FORMULARIO"
  },
  {
    id: 4,
    name: "Editar",
    value: "EDITAR_FORMULARIO"
  },
  {
    id: 5,
    name: "Responder",
    value: "RESPONDER_FORMULARIO"
  },
  {
    id: 6,
    name: "Ver respostas",
    value: "VER_FORMULARIO_RESPONDIDO"
  }
]


export default function Users() {
  const [newUser, setNewUser] = useState<DadosUsuario[]>([])
  const [teamUsers, setTeamUsers] = useState<DadosUsuario[]>([])
  const [allUsers, setAllUsers] = useState<DadosUsuario[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [perm, setPerm] = useState("")
  const [search, setSearch] = useState('')
  const [usrId, setUsrId] = useState(0)
  const [usrName, setUsrName] = useState('')

  const handleSearch = (text: string) => {
    setSearch(text)
  }

  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const i = axiosInstance

  async function getTeamUsers() {
    setIsLoading(true)
    try {
      const token = await getToken()

      const equipeid = await getEquipeId()

      const res = await i.get(
        `${BASEURL}${FILTRAR_USUARIOS_DA_EQUIPE}`,
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

      const res = await i.get(
        `${BASEURL}${FILTRAR_USUARIOS}`,
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
  }, [])

  const addUser = async () => {
    setIsLoading(!isLoading)

    const token = await getToken()

    const equipeid = await getEquipeId()

    const usuarioid = usrId

    try {
      const res = await i.post(`${BASEURL}${ADICONAR_USUARIO_A_EQUIPE}/${usuarioid}`, // como puxar o  usuario id
        {
          permissoes: perm

        }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Equipe: equipeid as number,
        },
        data: {},
      })

      if (res.status === 200) {
        setNewUser(res.data.content)
        ToastAndroid.show(`Usuário ${usrName} convidado para a equipe`,
          ToastAndroid.SHORT)
        setIsLoading(!isLoading)
      } else {
        throw new Error(`${JSON.stringify(res.data)}`)
      }
    }
    catch (err) {
      console.log(err)
      setIsLoading(!isLoading)
    }
  }

  const filteredUsers = allUsers.filter((usr) =>
    search ? usr.nome.toLowerCase().includes(search.toLowerCase()) : true
  )

  return (
    <>
      {teamUsers.map((user: DadosUsuario) => (
        <View key={user.id} style={styles.container}>
          <View style={{ padding: 8 }}>
            <Text style={{ fontSize: 16, color: "#555555", fontWeight: "600" }}>Membros da equipe:</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.imgContainer}>
              <FontAwesome name="user-circle-o" size={48} color="#ccc" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{user.nome}</Text>
              <Text style={styles.subtitle}>Vulgo: {user.usuario}</Text>
            </View>
          </View>
          <CustomButton onPress={toggleOverlay} title="Adicionar membro" />
        </View>
      ))}
      <Overlay
        overlayStyle={styles.overlayStyle}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <Text style={styles.modal__title}>Adicionar membros à equipe</Text>
        <CustomSearchBar
          placeholder='Nome do usuário'
          value={search}
          onChangeText={handleSearch}
        />
        {allUsers.length === 0 ? (<Text>Nenhum usuário foi encontrado...</Text>) :
          allUsers && allUsers.map((usr: DadosUsuario) => (
            <Pressable
              key={usr.id}
              onPress={() => {
                setUsrId(usr.id),
                  setUsrName(usr.nome)
              }}
            >
              <Text >{usr.nome}</Text>
              <Text>ID: {usr.id}</Text>
            </Pressable>
          ))}
        {permPreset && permPreset.map((perm: PermPreset) => (
          <Pressable key={perm.id} onPress={() => setPerm(perm.value)}>
            <Text>{perm.name}</Text>
          </Pressable>
        ))}
        <CustomButton onPress={addUser} title='+ Adicionar' />
      </Overlay>
    </>
  )
}

const styles = StyleSheet.create({
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
    elevation: 8
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
