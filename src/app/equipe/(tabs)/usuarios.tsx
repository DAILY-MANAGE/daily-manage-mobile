import { Text, View, StyleSheet } from "react-native"
import { BASEURL, FILTRAR_USUARIOS, FILTRAR_USUARIOS_DA_EQUIPE } from "../../../utils/endpoints"
import { useEffect, useState } from "react"
import { getEquipeId } from "../../equipes/(tabs)"
import { getToken } from "../../../hooks/token"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { axiosInstance } from "../../../utils/useAxios"
import CustomButton from "../../components/Button"
import { Overlay } from "@rneui/themed";
import CustomInput from "../../components/Input";
import CustomSearchBar from '../../components/SearchBar/index';

export interface DadosUsuario {
  id?: number
  usuario?: string
  nome?: string
}

export default function Users() {
  const [data, setData] = useState<DadosUsuario[]>([])
  const [allUsers, setAllUsers] = useState<DadosUsuario[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

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
    getTeamUsers()
  }, [])

  async function getAllUsers() {
    setIsLoading(true)
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
  }, [toggleOverlay])

  return (
    <>
      {data.map((user: DadosUsuario) => (
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
          placeholder='Pesquisar usuários'
          value={''}
          onChangeText={() => {}}
        />
        <CustomButton onPress={() => {}} title='Salvar' />
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
