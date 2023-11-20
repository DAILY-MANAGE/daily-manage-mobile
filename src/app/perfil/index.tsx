import { Text } from 'react-native'
import CustomInput from '../components/Input'
import { useState } from 'react'
import { axiosInstance } from '../../utils/useAxios'
import { getToken } from '../../hooks/token'
import { BASEURL } from '../../utils/endpoints'

export default function Perfil() {
 const [newName, setNewName] = useState('')
 const [isLoading, setIsLoading] = useState(false)

 const i = axiosInstance

 /* const changeName = async () => {

  setIsLoading(!isLoading)

  const token = await getToken()

  try {
    const res = i.patch(`${BASEURL}${EDITAR_NOME_USUARIO}`)

    if()
  } catch {

  }

 } */

 return (
  <>
   <CustomInput
    placeholder='Novo nome'
    value={newName}
    setValue={setNewName}
   />
  </>
 )
}