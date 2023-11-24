import { useState } from "react"
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  ToastAndroid,
  Text
} from "react-native"
import { useRouter } from "expo-router"
import { BASEURL, REGISTRO } from '../../utils/endpoints'
import ButtonComponent from "../components/Button"
import CustomInput from "../components/Input"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { axiosInstance } from "../../utils/useAxios"
import { saveColor } from "../../utils/constants"

export default function Cadastro() {
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [securePassword, setSecurePassword] = useState(true)
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true)
  const [render, setRender] = useState(false)

  const router = useRouter()

  const validateFields = () => {
    const errors = { name, user, mail, password, confirmPassword }

    if (!name) {
      errors.name = "O campo nome é obrigatório."
    } else {
      errors.name = ""
    }

    if (!user) {
      errors.user = "O campo usuário é obrigatório."
    } else if (user.length < 5) {
      errors.user = "O campo usuário deve ter mais que 5 caracteres."
    } else {
      errors.user = ""
    }

    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!mail) {
      errors.mail = "O campo e-mail é obrigatório."
    } else if (!regex.test(mail)) {
      errors.mail = "E-mail inválido"
    } else {
      errors.mail = ""
    }

    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    if (!password) {
      errors.password = "A senha é obrigatória."
    } else if (!regexPassword.test(password)) {
      errors.password =
        "A senha precisa ter uma letra maiúscula, uma minúscula, um número e um símbolo, e no mínimo 8 caracteres"
    } else {
      errors.password = ""
    }

    if (!confirmPassword) {
      errors.confirmPassword = "É necessário confirmar a senha."
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "As senhas precisam ser iguais"
    } else {
      errors.confirmPassword = ""
    }

    return errors
  }

  const errors = validateFields()

  const toggleSecurePassword = () => {
    setSecurePassword(!securePassword)
  }

  const toggleSecureConfirmPassword = () => {
    setSecureConfirmPassword(!secureConfirmPassword)
  }

  const i = axiosInstance

  const register = async () => {
    setRender(true)
    setIsLoading(true)

    try {
      const res = await i.post(
        `${BASEURL}${REGISTRO}`,
        {
          usuario: user,
          senha: password,
          nome: name,
          email: mail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (res.status === 201) {
        setIsLoading(false)
        ToastAndroid.show(
          `Usuário ${user} criado com sucesso!`,
          ToastAndroid.SHORT
        )
        router.push("(auth)")
      }
      else {
        throw new Error(`${JSON.stringify(res.data)}`)
      }
    }

    catch (err) {
      console.log(err)

      if (err.response && err.response.status === 409) {
        ToastAndroid.showWithGravity(
          "Usuário ou e-mail já em uso...",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        )
      } else if (err.response && err.response.status === 403) {
        ToastAndroid.showWithGravity(
          "Dados incorretos...",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        )
      } else {
        ToastAndroid.showWithGravity(
          "Cadastro não realizado. Verifique os dados ou tente novamente mais tarde.",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        )
      }

      setIsLoading(false)
    }
  }

  function Eye({ onPress }) {
    return (
      <Pressable onPress={onPress}>
        {!securePassword ? <FontAwesome size={20} name="eye" /> : <FontAwesome size={20} name="eye-slash" color="#acacac" />}
      </Pressable>
    )
  }

  function EyeConfirm({ onPress }) {
    return (
      <Pressable onPress={onPress}>
        {!secureConfirmPassword ? <FontAwesome size={20} name="eye" /> : <FontAwesome size={20} name="eye-slash" color="#acacac" />}
      </Pressable>
    )
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <ScrollView style={styles.inputs}>
          <CustomInput
            errorMessage={errors.name}
            label="Nome:"
            placeholder="Digite o nome completo"
            textContentType="name"
            value={name}
            setValue={setName}
            autoComplete="name"
            style={styles.customInput}
            renderError={render}
          />
          <CustomInput
            errorMessage={errors.user}
            label="Usuário:"
            placeholder="Digite o nome de usuário"
            textContentType="username"
            value={user}
            setValue={setUser}
            autoComplete="username"
            style={styles.customInput}
            renderError={render}
          />
          <CustomInput
            errorMessage={errors.mail}
            label="E-mail:"
            placeholder="Digite o e-mail"
            textContentType="emailAddress"
            value={mail}
            setValue={setMail}
            autoComplete="email"
            style={styles.customInput}
            renderError={render}
          />
          <CustomInput
            errorMessage={errors.password}
            label="Senha:"
            placeholder="Digite a senha"
            textContentType="password"
            value={password}
            setValue={setPassword}
            autoComplete="password"
            secureTextEntry={securePassword}
            rightIcon={<Eye onPress={toggleSecurePassword} />}
            style={styles.customInput}
            rightIconStyle={styles.rightIconContainerStyle}
            renderError={render}
          />
          <CustomInput
            errorMessage={errors.confirmPassword}
            label="Confirmar Senha:"
            placeholder="Confirme a senha"
            textContentType="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            autoComplete="password"
            secureTextEntry={secureConfirmPassword}
            rightIcon={<EyeConfirm onPress={toggleSecureConfirmPassword} />}
            style={styles.customInput}
            rightIconStyle={styles.rightIconContainerStyle}
            renderError={render}
          />
        </ScrollView>
        <Pressable style={styles.button}>
          {isLoading ? (
            <ButtonComponent title="Salvar" loading={true} />
          ) : (
            <ButtonComponent
              color={saveColor}
              onPress={register}
              buttonStyle={styles.saveButton}
              titleStyle={styles.saveButton__title}
              title="SALVAR" />
          )}
        </Pressable>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  saveButton: {
    borderWidth: 2,
    borderColor: "#c1c1c1",
    shadowColor: "black",
    elevation: 8
  },
  saveButton__title: {
    fontWeight: "900",
    fontSize: 16
  },
  rightIconContainerStyle: {
    height: 32,
    width: "auto",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "column"
  },
  customInput: {
    marginBottom: 32,
    gap: 8,
    width: "100%"
  },
  container: {
    backgroundColor: "white",
    paddingBottom: 16,
    paddingHorizontal: 24,
    height: "100%",
    justifyContent: "space-between",
  },
  inputs: {
    backgroundColor: "white",
    paddingTop: 24,
    height: "100%",
    flexDirection: "column",
    width: "100%",
  },
  checkboxTextStyle: {
    fontWeight: "600",
    color: "black",
  },
  button: {
    width: "100%",
    bottom: 0,
  },
})
