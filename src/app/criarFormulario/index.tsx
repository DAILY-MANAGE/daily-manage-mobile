import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { getToken } from "../../hooks/token";
import { QuestionData, FormData } from "../../interfaces/DadosFormulario";
import {
  CRIAR_FORMULARIO,
  BASEURL,
  FILTRAR_USUARIOS_DA_EQUIPE,
} from "../../utils/endpoints";
import CustomInput from "../components/Input";
import CustomButton from "../components/Button/index";
import { Switch } from "@rneui/themed";
import { ListItem } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "../../utils/useAxios";
import { getEquipeId } from "../equipes/(tabs)/index";

interface Preset {
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

interface PresetPermittedUsers {
  id?: number;
  nome?: string;
  usuario?: string;
  email?: string;
}

export default function CriarFormulario() {
  const [nomeFormulario, setNomeFormulario] = useState<string | null>(null);
  const [descricaoFormulario, setDescricaoFormulario] = useState<string | null>(
    null
  );
  const [descricaoPergunta, setDescricaoPergunta] = useState<string | null>(
    null
  );
  const [tiporesposta, setTiporesposta] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<FormData[]>([]);
  const [expandedRes, setExpandedRes] = useState(false);
  const [countValue, setCountValue] = useState(1);
  const router = useRouter();
  const [expandedUsr, setExpandedUsr] = useState(false);
  const [dataUsr, setDataUsr] = useState<PresetPermittedUsers[]>([]);
  const [usuariosPermitidos, setUsuariosPermitidos] = useState<number[]>([]);

  const [questions, setQuestions] = useState([
    {
      descricao: "",
      tiporesposta: "",
      opcional: true,
    },
  ]);

  const toggleOptional = (index: number) => {
    const questionsClone = [...questions];
    questionsClone.map((question: (typeof questions)[0], index2: number) => {
      if (index == index2) {
        question.opcional = !question.opcional;
      }
      return question;
    });
    setQuestions(questionsClone);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { descricao: "", tiporesposta: "", opcional: false },
    ]);
  };

  const i = axiosInstance;

  const resetCounter = () => {
    setCountValue(1);
  };

  const setIdUsuariosPermitidos = async (data: number[]) => {
    if (data) {
      console.log(data);
      try {
        await AsyncStorage.setItem(
          "idusuariospermitidos",
          JSON.stringify(data)
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

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

  async function getPermittedUsers() {
    setIsLoading(true);

    try {
      const token = await getToken();

      const equipeid = await getEquipeId();

      const res = await i.get(`${BASEURL}${FILTRAR_USUARIOS_DA_EQUIPE}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Equipe: equipeid as number,
        },
        data: {},
      });

      if (res.status === 200) {
        setIdUsuariosPermitidos(usuariosPermitidos);
        setDataUsr(res.data.content);
        setIsLoading(false);
      } else {
        throw new Error(`${JSON.stringify(res.data)}`);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPermittedUsers();
  }, [setExpandedUsr]);

  const createForm = async () => {
    setIsLoading(true);

    try {
      const token = await getToken();

      const equipeid = await getEquipeId();

      const res = await axiosInstance.post(
        `${BASEURL}${CRIAR_FORMULARIO}`,
        {
          nome: nomeFormulario,
          idusuariospermitidos: usuariosPermitidos,
          descricao: descricaoFormulario,
          perguntas: questions,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Equipe: equipeid as number,
          },
          data: {},
        }
      );

      if (res.status === 201) {
        console.log(`${JSON.stringify(res.data)}`);
        setData(res.data);
        console.log({
          perguntas: questions
        });
        router.replace("equipe");
        resetCounter();
        setIsLoading(false);
      } else {
        throw new Error(`${JSON.stringify(res.data)}`);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <ScrollView contentContainerStyle={styles.inputs}>
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
          <ListItem.Accordion
            containerStyle={styles.accordion__container}
            content={
              <ListItem.Content>
                <ListItem.Title style={styles.accordion__title}>
                  Usuários permitidos
                </ListItem.Title>
              </ListItem.Content>
            }
            isExpanded={expandedUsr}
            onPress={() => setExpandedUsr(!expandedUsr)}
          >
            {isLoading && isLoading ? (
              <Text>Buscando usuários...</Text>
            ) : dataUsr.length === 0 ? (
              <Text>Nenhum usuário foi encontrado</Text>
            ) : (
              dataUsr.map((user: PresetPermittedUsers) => (
                <ListItem
                  bottomDivider={false}
                  style={styles.list}
                  key={user.id}
                  onPress={() => {
                    setUsuariosPermitidos((prevState) => {
                      if (prevState.includes(user.id)) {
                        return prevState.filter((id) => id !== user.id);
                      }
                      return [...prevState, user.id];
                    });
                  }}
                >
                  <Text>{user.usuario}</Text>
                </ListItem>
              ))
            )}
          </ListItem.Accordion>
          {questions.map((question, i) => (
            <ScrollView key={i}>
              <View style={styles.question}>
                <CustomInput
                  label={`Pergunta ${i+1}`}
                  placeholder="Comprou leite?"
                  value={question.descricao}
                  setValue={(value) => {
                    const newQuestion = [...questions];
                    newQuestion[i].descricao = value;
                    setQuestions(newQuestion);
                  }}
                />
                <ListItem.Accordion
                  containerStyle={styles.accordion__container}
                  content={
                    <ListItem.Content>
                      <ListItem.Title style={styles.accordion__title}>
                        Tipo de resposta
                      </ListItem.Title>
                    </ListItem.Content>
                  }
                  isExpanded={expandedRes}
                  onPress={() => setExpandedRes(!expandedRes)}
                >
                  {presets.map((data: Preset) => (
                    <ListItem
                      key={data.id}
                      style={styles.list}
                      onPress={() => {
                        const newQuestion = [...questions];
                        newQuestion[i].tiporesposta = data.value;
                        setQuestions(newQuestion);
                        console.log(questions[i])
                      }}
                    >
                      <Text>{data.name}</Text>
                    </ListItem>
                  ))}
                </ListItem.Accordion>

                <View style={styles.switch__container}>
                  <Text style={styles.switch__label}>Obrigatório</Text>
                  <Switch
                    color="black"
                    value={!question.opcional}
                    onValueChange={() => toggleOptional(i)}
                  />
                </View>
              </View>
            </ScrollView>
          ))}
        </ScrollView>
      </ScrollView>
      <View style={styles.footer}>
        <CustomButton
          buttonStyle={styles.createButton}
          onPress={() => addQuestion()}
          title={"+ Adicionar Pergunta"}
        />
        <CustomButton
          buttonStyle={styles.createButton}
          color="#12d185"
          onPress={createForm}
          title="CRIAR"
          titleStyle={{ fontWeight: 900 }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  list__item: {
    padding: 0,
  },
  footer__buttons: {
    flexDirection: "row",
    width: "100%",
  },
  createButton: {
    width: "100%",
  },
  list__content: {
    backgroundColor: "#FAFAFA",
    padding: 0,
  },
  question: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderWidth: 1,
    borderColor: "#c5c5c5",
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
    gap: 8,
    backgroundColor: "white",
    position: "relative",
    alignSelf: "center",
    justifyContent: "space-evenly",
    padding: 16,
  },
  accordion__container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 8,
  },
  accordion__title: {
    fontSize: 16,
    fontWeight: "500",
  },
  list: {
    width: "100%",
    height: "auto",
    padding: 0,
    backgroundColor: "#FAFAFA",
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
