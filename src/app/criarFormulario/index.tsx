import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { getToken } from "../../hooks/token";
import { IdStorage } from "../../hooks/useId";
import { DadosFormulario } from "../../interfaces/DadosFormulario";
import { CRIAR_FORMULARIO, ENDPOINT } from "../../utils/endpoints";
import CustomInput from "../components/Input";
import { getEquipeData } from "../equipes";
import CustomButton from "../components/Button/index";
import { Switch } from "@rneui/themed";
import { ListItem } from "@rneui/themed";
import AccordionPessoas, {
  PresetPermittedUsers,
  setIdUsuariosPermitidos,
} from "./components/PessoasPermitidas";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Preset {
  id: number;
  name: string;
  value: string;
}

const presets: Preset[] = [
  {
    id: 1,
    name: "Texto",
    value: "TEXTO",
  },
  {
    id: 2,
    name: "Sim ou Não",
    value: "BOOLEANO",
  },
  {
    id: 3,
    name: "Número Inteiro",
    value: "INTEIRO",
  },
  {
    id: 4,
    name: "Número Decimal",
    value: "DECIMAL",
  },
  {
    id: 5,
    name: "Múltipla Escolha",
    value: "MULTIPLA_ESCOLHA",
  },
  {
    id: 6,
    name: "Celsius",
    value: "CELSIUS",
  },
  {
    id: 7,
    name: "Quilograma",
    value: "QUILOGRAMA",
  },
  {
    id: 8,
    name: "Porcentagem",
    value: "PORCENTAGEM",
  },
  {
    id: 9,
    name: "Litro",
    value: "LITRO",
  },
];

export const setPerguntas = async (data: string[]) => {
  if (data) {
    try {
      await AsyncStorage.setItem("perguntas", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }
};

export default function CriarFormulario() {
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
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DadosFormulario[]>([]);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const [questions, setQuestions] = useState<string[]>([]);

  const getIdUsuariosPermitidos = async (): Promise<number[] | null> => {
    try {
      const id = await AsyncStorage.getItem("idusuariospermitidos");
      if (id !== null) {
        return JSON.parse(id);
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const axiosInstance = axios.create({
    baseURL: ENDPOINT,
  });

  const clearValues = () => {
    setNomeFormulario("");
    setDescricaoFormulario("");
    setDescricaoPergunta("");
    setTipoResposta("");
    setIdUsuariosPermitidos(null);
    setRespostaOpcional(false);
  };

  const equipeData = async () => {
    return await getEquipeData();
  };

  const criarFormulario = async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      const idUsuariosPermitidos = await getIdUsuariosPermitidos();
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
            Equipe: (await equipeData()) as number,
          },
          data: {},
        }
      );
      if (response.status === 201) {
        console.log(`${JSON.stringify(response.data)}`);
        setData(response.data);
        setPerguntas(response.data.perguntas);
        IdStorage.setId(response.data.id);
        clearValues();
        setIsLoading(false);
      } else {
        throw new Error(`${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const toggleSwitch = () => {
    setRespostaOpcional(!respostaOpcional);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputs}>
        <CustomInput
          label="Nome:"
          placeholder="Lista de Compras..."
          value={nomeFormulario}
          setValue={setNomeFormulario}
        />
        <CustomInput
          label="Descrição:"
          placeholder="Lista de compras da família Lutherik..."
          value={descricaoFormulario}
          setValue={setDescricaoFormulario}
        />
        <ScrollView>
          <View style={styles.question}>
            <CustomInput
              label="Pergunta:"
              placeholder="Comprou leite?"
              value={descricaoPergunta}
              setValue={setDescricaoPergunta}
            />
            <ListItem.Accordion
              containerStyle={styles.accordion__container}
              content={
                <>
                  <ListItem.Content>
                    <ListItem.Title style={styles.accordion__title}>
                      Tipo de resposta
                    </ListItem.Title>
                  </ListItem.Content>
                </>
              }
              isExpanded={expanded}
              onPress={() => {
                setExpanded(!expanded);
              }}
            >
              {presets.map((data: Preset) => (
                <ListItem
                  key={data.id}
                  style={styles.list}
                  onPress={(e) => {
                    setTipoResposta(data.value);
                    console.log(tipoResposta);
                  }}
                  bottomDivider
                >
                  <ListItem.Content style={styles.list__content}>
                    <ListItem.Title>{data.name}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </ListItem.Accordion>
            <AccordionPessoas />
            <View style={styles.switch__container}>
              <Text style={styles.switch__label}>Obrigatório</Text>
              <Switch
                color="black"
                value={respostaOpcional}
                onValueChange={(value) => setRespostaOpcional(value)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <CustomButton onPress={criarFormulario} title={"+ Criar"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list__content: {
    backgroundColor: "#FAFAFA",

  },
  question: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    gap: 8,
  },
  inputs: {
    gap: 16,
  },
  footer: {
    width: "100%",
    height: "auto",
    bottom: 0,
  },
  accordion__container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f3f6f4",
    borderRadius: 8,
  },
  accordion__title: {
    fontSize: 16,
    fontWeight: "500",
  },
  list: {
    width: "60%",
    height: "auto",
    backgroundColor: "red"
  },
  container: {
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    backgroundColor: "white",
    gap: 8,
    padding: 16,
  },
  switch__container: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
    alignItems: "center",
  },
  switch__label: {
    fontSize: 16,
    fontWeight: "700",
  },
});
