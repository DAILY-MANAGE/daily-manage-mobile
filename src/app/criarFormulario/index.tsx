import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text } from "react-native";
import { getToken } from "../../hooks/token";
import { IdStorage } from "../../hooks/useId";
import { DadosFormulario } from "../../interfaces/DadosFormulario";
import { CRIAR_FORMULARIO, ENDPOINT } from "../../utils/endpoints";
import CustomInput from "../components/Input";
import { getEquipeData } from "../equipes";
import CustomButton from "../components/Button/index";
import { Switch } from "@rneui/themed";
import { ListItem } from "@rneui/themed";
import { Icon } from "@rneui/themed";

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
  const [idUsuariosPermitidos, setIdUsuariosPermitidos] = useState<
    number | null
  >(null);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DadosFormulario[]>([]);
  const [expanded, setExpanded] = useState(false)
  const router = useRouter();

  const axiosInstance = axios.create({
    baseURL: ENDPOINT,
  });

  const criarFormulario = async () => {
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
        setDescricaoFormulario("");
        setDescricaoPergunta("");
        setTipoResposta("");
        setIdUsuariosPermitidos(null);
        setRespostaOpcional(false);
        setIsLoading(false);
      } else {
        throw new Error(`${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.log(nomeFormulario, descricaoFormulario);
      console.log(error);
      setIsLoading(false);
    }
  };

  const toggleSwitch = () => {
    setRespostaOpcional(!respostaOpcional);
  };

  return (
    <>
      <Text>Criar Formulario</Text>
      <CustomInput
        placeholder="Nome do formulário"
        value={nomeFormulario}
        setValue={setNomeFormulario}
      />
      <CustomInput
        placeholder="Descrição do formulário"
        value={descricaoFormulario}
        setValue={setDescricaoFormulario}
      />
      <CustomInput
        placeholder="Descrição da pergunta"
        value={descricaoPergunta}
        setValue={setDescricaoPergunta}
      />
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>Tipo de resposta</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        {presets.map((data: Preset) => (
          <ListItem key={data.id} onPress={(e) => {setTipoResposta(data.value); console.log(tipoResposta)}} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{data.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ListItem.Accordion>
      <Switch
        value={respostaOpcional}
        onValueChange={(value) => setRespostaOpcional(value)}
      />
      <CustomInput
        placeholder="Usuários permitidos"
        value={idUsuariosPermitidos}
        setValue={setIdUsuariosPermitidos}
      />
      <CustomButton onPress={criarFormulario} title={"+ Criar"} />
    </>
  );
}
