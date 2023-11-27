import { ScrollView, Text, ToastAndroid, StyleSheet, Pressable, RefreshControl, View } from 'react-native'
import CustomInput from '../components/Input'
import React, { useCallback, useEffect, useState } from 'react'
import { axiosInstance } from '../../utils/useAxios'
import { getToken } from '../../hooks/token'
import { BASEURL } from '../../utils/endpoints'
import { DadosUsuario } from '../equipe/(tabs)/usuarios'
import CustomButton from '../components/Button'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { saveColor } from '../../utils/constants'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Perfil() {
  const [newName, setNewName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newMail, setNewMail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const [newData, setNewData] = useState<DadosUsuario[]>([])
  const [isEditEnabled, setIsEditEnabled] = useState(false)
  const [securePassword, setSecurePassword] = useState(true)
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true)
  const [render, setRender] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [aux, setAux] = useState(0)

  const router = useRouter()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      router.replace("perfil")
    }, 500)
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData')
        if (userDataString) {
          const userData = JSON.parse(userDataString)
          console.log(userData)
          setUserData(userData)
        }
      } catch (error) {
        console.error('Erro ao puxar os dados do usuario:', error)
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
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

  const validateFields = () => {
    const errors = { newName, newUsername, newMail, newPassword, confirmPassword }

    if (userData && userData.name && newName === userData.name) {
      errors.newUsername = "O nome não pode ser igual ao antigo"
    } else {
      errors.newUsername = ''
    }

    if (newUsername && newUsername.length < 5) {
      errors.newUsername = "O campo usuário deve ter mais que 5 caracteres."
    } else if (userData && userData.user && newUsername === userData.user) {
      errors.newUsername = "O nome de usuário não pode ser igual ao antigo"
    } else {
      errors.newUsername = ''
    }

    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (newMail && !regex.test(newMail)) {
      errors.newMail = "E-mail inválido"
    } else if (userData && userData.mail && newMail === userData.mail) {
      errors.newMail = "O e-mail não pode ser igual ao antigo"
    } else {
      errors.newMail = ""
    }

    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (newPassword && !regexPassword.test(newPassword)) {
      errors.newPassword = "A senha precisa ter ao menos um número um símbolo"
    } else if (userData && userData.password && newPassword === userData.password) {
      errors.newPassword = "A senha não pode ser igual à antiga"
    } else {
      errors.newPassword = ''
    }

    if (!confirmPassword) {
      errors.confirmPassword = "É necessário confirmar a senha."
    } else if (userData && userData.password && confirmPassword !== userData.password) {
      errors.confirmPassword = "A senha informada não coincide com a original."
    } else {
      errors.confirmPassword = ""
    }

    return errors
  }

  const toggleSecurePassword = () => {
    setSecurePassword(!securePassword)
  }

  const toggleSecureConfirmPassword = () => {
    setSecureConfirmPassword(!secureConfirmPassword)
  }

  const errors = validateFields()

  const i = axiosInstance

  const changeUserData = async () => {

    setRender(true)

    setIsLoading(!isLoading)

    const token = await getToken()

    try {
      const body = {
        nome: newName,
        usuario: newUsername,
        email: newMail,
        senhaAntiga: userData.password,
        novaSenha: newPassword
      }

      if (userData) {
        if (userData.name === newName) {
          delete body.nome
        }
        if (userData.user === newUsername) {
          delete body.usuario
        }
        if (userData.mail === newMail) {
          delete body.email
        }
        if (userData.password === newPassword) {
          delete body.senhaAntiga
          delete body.novaSenha
        }
      }

      const res = await i.patch(`${BASEURL}/usuario/alterarDados`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {},
        })

      if (res.status === 200) {
        setNewData(res.data.content)
        setIsEditEnabled(false)
        ToastAndroid.show(
          `Dados alterados com sucesso!`,
          ToastAndroid.SHORT)
      } else {
        throw new Error(`${JSON.stringify(newData)}`)
      }
    }
    catch (err) {
      switch (err.response.status) {
        case 400:
          const validationErrors = err.response.data.errors
          console.error(`Validation Error: ${JSON.stringify(validationErrors)}`)
          ToastAndroid.show(
            validationErrors,
            ToastAndroid.SHORT)
          break

        case 404:
          const notFoundError = err.response.data.errors
          console.error(`Not Found Error: ${notFoundError}`)
          ToastAndroid.show(
            notFoundError,
            ToastAndroid.SHORT)
          break

        case 409:
          const conflictErrors = err.response.data.errors
          console.error(`Conflict Error: ${JSON.stringify(conflictErrors)}`)
          ToastAndroid.show(
            conflictErrors,
            ToastAndroid.SHORT)
          break

        default:
          console.error(`An error occurred: ${err.message}`)
          ToastAndroid.show(
            'Ocorreu um erro inesperado.',
            ToastAndroid.SHORT)
      }
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
    <ScrollView
      contentContainerStyle={styles.container__content}
      style={styles.container}
      refreshControl={
        <RefreshControl
          progressBackgroundColor={"#262626"}
          colors={[saveColor]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.title__inputs}>
        <Text style={styles.title}>Dados do usuário</Text>
        {isEditEnabled && (
          <View style={styles.inputs__container}>
            <View style={styles.inputs}>
              <CustomInput
                errorMessage={errors.newName}
                label='Novo nome'
                placeholder={userData && userData.name}
                value={newName}
                setValue={setNewName}
                textContentType="name"
                inputStyle={styles.inputStyle}
                renderError={render}
              />
              <CustomInput
                errorMessage={errors.newUsername}
                label='Novo nome de usuário'
                placeholder={userData && userData.user}
                value={newUsername}
                setValue={setNewUsername}
                textContentType="username"
                inputStyle={styles.inputStyle}
                renderError={render}
              />
              <CustomInput
                errorMessage={errors.newMail}
                label='Novo e-mail'
                placeholder={userData && userData.mail}
                value={newMail}
                inputStyle={styles.inputStyle}
                setValue={setNewMail}
                renderError={render}
              />
              <CustomInput
                errorMessage={errors.newPassword}
                label='Nova senha'
                placeholder='Digite a nova senha'
                value={newPassword}
                setValue={setNewPassword}
                secureTextEntry={securePassword}
                textContentType="password"
                inputStyle={styles.inputStyle}
                rightIcon={<Eye onPress={toggleSecurePassword} />}
                renderError={render}
              />
              <CustomInput
                errorMessage={errors.confirmPassword}
                label='Confirmar senha antiga'
                placeholder='Confirme a senha'
                value={confirmPassword}
                setValue={setConfirmPassword}
                inputStyle={styles.inputStyle}
                secureTextEntry={secureConfirmPassword}
                textContentType="password"
                rightIcon={<EyeConfirm onPress={toggleSecureConfirmPassword} />}
                renderError={render}
              />
            </View>
          </View>
        )
        }
        {
          !isEditEnabled && (
            <View style={styles.inputs__container}>
              <View style={styles.inputs}>
                <CustomInput
                  label='Nome completo'
                  inputStyle={styles.inputStyle}
                  placeholder={userData && userData.name}
                  editable={false}
                />
                <CustomInput
                  label='Nome de usuário'
                  inputStyle={styles.inputStyle}
                  placeholder={userData && userData.user}
                  editable={false}
                />
                <CustomInput
                  label='E-mail'
                  inputStyle={styles.inputStyle}
                  placeholder={userData && userData.mail}
                  editable={false}
                />
                <CustomInput
                  label='Senha'
                  inputStyle={styles.inputStyle}
                  placeholder='*****************'
                  editable={false}
                  secureTextEntry={true}
                />

              </View>

            </View>
          )
        }
      </View>
      <View style={styles.footer}>
        {isEditEnabled ? (
          <CustomButton
            title='SALVAR'
            color={saveColor}
            onPress={changeUserData}
            buttonStyle={styles.button}
          />
        ) : (
          <CustomButton
            title='EDITAR'
            color="orange"
            onPress={() => setIsEditEnabled(true)}
            buttonStyle={styles.button}
          />
        )}
      </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  title__inputs: {
    flexDirection: "column",
    gap: 8
  },
  footer: {
    height: "auto",
    width: "100%",
    paddingBottom: 16,
    bottom: 0
  },
  button: {
    height: "auto",
    width: "100%"
  },
  inputs__container: {
    height: "auto",
    width: "100%",
  },
  inputs: {
    width: "100%",
    height: "auto",
    flexDirection: "column",
    gap: 16,
  },
  inputStyle: {
    top: 12,
    fontSize: 16,
    paddingLeft: 8,
    fontStyle: "normal",
    fontWeight: "500",
    color: "#323232"
  },
  container__content: {
    flex: 1,
    flexDirection: 'column',
    gap: 16,
    width: "100%",
    justifyContent: "space-between"
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    paddingTop: 8,
    paddingHorizontal: 16
  },
  title: {
    paddingVertical: 16,
    fontSize: 24,
    fontWeight: "700"
  },
})