import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ENDPOINT, CRIAR_FORMULARIO } from "../../../utils/endpoints";
import OverlayFormulario from "../(components)/OverlayFormulario";
import { CardFormulario } from "../(components)/CardFormulario";
import { DadosFormulario } from "../../../interfaces/DadosFormulario";
import { getToken } from "../../../hooks/token";
import { IdStorage } from "../../../hooks/useId";
import { getEquipeData } from "../../equipes";
import axios from "axios";
import { Button } from "@rneui/base";
import CustomButton from "../../components/Button";

export const formularioid = IdStorage.getId();

export default function Formularios() {
  const [nomeFormulario, setNomeFormulario] = useState<string | null>(null);
  const [descricaoFormulario, setDescricaoFormulario] = useState<string | null>(
    null
  );
  const [descricaoPergunta, setDescricaoPergunta] = useState<string | null>(
    null
  );
  const [tipoResposta, setTipoResposta] = useState<string | null>(null);
  const [respostaOpcional, setRespostaOpcional] = useState<boolean | null>(
    false
  );
  const [idUsuariosPermitidos, setIdUsuariosPermitidos] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DadosFormulario[]>([]);
  const router = useRouter();

  const axiosInstance = axios.create({
    baseURL: ENDPOINT,
  });

/*   const criarFormulario = async () => {
    setIsLoading(true);
    try {
      const equipeData = await getEquipeData();
      const token = await getToken();
      const response = await axiosInstance.post(
        `${ENDPOINT}${CRIAR_FORMULARIO}`,
        {
          nome: nomeFormulario,
          descricao: descricaoFormulario,
          perguntas: [
            {
              descricao: descricaoPergunta,
              tiporesposta: tipoResposta,
              opcional: respostaOpcional,
            },
          ],
          idusuariospermitidos: idUsuariosPermitidos,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Equipe: equipeData as number,
          },
          data: {},
        }
      );
      if (response.status === 201) {
        console.log(`${JSON.stringify(response.data)}`);
        setData(response.data);
        IdStorage.setId(response.data.id);
        setNomeFormulario("");
        setIsLoading(false);
      } else {
        throw new Error(`${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }; */

  return (
    <ScrollView style={styles.container}>
      {/* <OverlayFormulario
        value={nomeFormulario}
        setValue={setNomeFormulario}
        onPress={criarFormulario}
        editable={!isLoading}
      /> */}
      <CustomButton title="Criar Formulario" onPress={() => router.push('criarFormulario')} />
      <Pressable
        onPress={async () =>
          router.push({
            pathname: `/formulario/[${formularioid}]`,
            params: { id: `${formularioid}` },
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
