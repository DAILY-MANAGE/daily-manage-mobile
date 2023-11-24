import { ResponseTypePreset, responseTypePreset } from '../app/criarFormulario/index'
export interface FormData {
 id?: number,
 nome?: string,
 descricao?: string
 idusuariospermitidos?: number[],
 perguntas?: QuestionData[],
}

export interface QuestionData {
 id?: number,
 resposta?: { resposta: any },
 descricao?: string,
 tiporespostadefault?: string,
 tiporesposta?: ResponseType
 opcional?: boolean
}

export enum ResponseType {
 TEXTO,
 BOOLEANO,
 INTEIRO,
 DECIMAL,
 CELSIUS,
 QUILOGRAMA,
 PORCENTAGEM,
 LITRO,
 MULTIPLA_ESCOLHA
}