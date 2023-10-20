import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  useLocalSearchParams,
  useRouter
} from 'expo-router';
import { baseURL, postFormulario } from '../../../utils/endpoints';
import OverlayFormulario from '../(components)/OverlayFormulario';
import { CardFormulario } from '../(components)/CardFormulario';
import { DadosFormulario } from '../../../interfaces/DadosFormulario';
import { getToken } from '../../../hooks/token';
import axios from 'axios';

export default function Formularios() {
  const [nomeFormulario, setNomeFormulario] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DadosFormulario[]>([]);
  const [id, setId] = useState(null);
  const param = useLocalSearchParams();
  const router = useRouter();

  const refresh = async () => {
    return router.replace("(tabs)");
  };

  const axiosInstance = axios.create({
    baseURL: baseURL,
  });

  const criarFormulario = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `${baseURL}/${postFormulario}?equipeid=${param.id}`,
        {
          nome: nomeFormulario,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
            Equipe: id
          },
          data: {},
        }
      );
      if (response.status === 201) {
        console.log(`${JSON.stringify(response.data)}`);
        setData(response.data);
        setId(response.data.id);
        setNomeFormulario("");
        setIsLoading(false);
        await refresh();
      } else {
        throw new Error(`${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <OverlayFormulario
        value={nomeFormulario}
        setValue={setNomeFormulario}
        onPress={criarFormulario}
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
