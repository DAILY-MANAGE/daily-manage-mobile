import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { baseURL } from '../../utils/baseURL';
import { getToken } from '../(auth)';
import OverlayFormulario from '../paginaEquipe/components/OverlayFormulario';
import { CardFormulario } from './components/CardFormulario';

const param = useLocalSearchParams();
let paramId: any;

export const getParamId = async () => {
 return paramId = param.id;
}
const axiosInstance = axios.create({
 baseURL: baseURL,
});

export interface DadosFormularios {
 id?: number,
 nome?: string,
 usuariosPermitidos?: number,
 campos?: [],
 informacoes?: [],
}

export interface DadosPerguntas {
 descricao?: string,
 unidade?: string | boolean | undefined;
}

export default function Formularios() {
 const [nomeFormulario, setNomeFormulario] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState(false);
 const [data, setData] = useState<DadosFormularios[]>([]);
 const [id, setId] = useState(null);

 const router = useRouter();

 const refresh = async () => {
   return router.replace("paginaEquipe");
 };

 const criarFormulario = async () => {
   setIsLoading(true);
   try {
     const response = await axiosInstance.post(
       `${baseURL}/equipe/forms?equipeid=${await getParamId()}`,
       {
         nome: nomeFormulario,
       },
       {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${await getToken()}`,
         },
         data: {},
       }
     );
     if (response.status === 201) {
       console.log(`${JSON.stringify(response.data)}`);
       setIsLoading(false);
       setData(response.data);
       setId(response.data.id);
       await refresh();
       setNomeFormulario("");
     } else {
       throw new Error(`${JSON.stringify(response.data)}`);
     }
   } catch (error) {
     console.log(error);
     setIsLoading(false);
   }
 };

 return (
   <>
     <ScrollView style={styles.container}>
       <OverlayFormulario
         value={nomeFormulario}
         setValue={setNomeFormulario}
         onPress={() => {
           criarFormulario();
         }}
         editable={!isLoading}
       />
       <Pressable
         onPress={() =>
           router.push({
             pathname: `/formulario/[${id}]`,
             params: { id: `${id}` },
           })
         }
         style={styles.formularioContainer}
       >
         <CardFormulario />
       </Pressable>
     </ScrollView>
   </>
 );
}

const styles = StyleSheet.create({
 formularioContainer: {
   paddingTop: 8,
   height: "auto",
   width: "100%",
   gap: 8,
 },
 container: {
   gap: 8,
   height: "100%",
   width: "100%",
   padding: 16,
   flexDirection: "column",
   margin: 0,
 },
});
