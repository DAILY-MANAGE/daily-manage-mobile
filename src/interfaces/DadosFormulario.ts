import { ResponseTypePreset, responseTypePreset } from '../app/criarFormulario/index'
export interface FormData {
 id?: number,
 nome?: string,
 descricao?: string
 usuariosPermitidos?: number[],
 perguntas?: QuestionData[],
}

export interface FormDataRead {
 id?: number,
 nome?: string,
 descricao?: string
 usuario?: {
  usuario: string,
  nome: string,
  permissoes: string[]
 },
 perguntas?: QuestionDataRead[],
}

export interface PermittedUsers {
 usuario: string,
 nome: string,
 permissoes: string[]
}
export interface QuestionData {
 id?: number,
 resposta?: { idpergunta: number, resposta: any },
 descricao?: string,
 tiporespostadefault?: string,
 tipoResposta?: ResponseType
 opcional?: boolean
 usuario?: {
  usuario: string,
  nome: string,
  permissoes: string[]
 }
}

export interface QuestionDataRead {
 id?: number,
 resposta?: { idpergunta: number, resposta: any },
 descricao?: string,
 tiporespostadefault?: string,
 tipoResposta?: string
 opcional?: boolean
 usuario?: {
  usuario: string,
  nome: string,
  permissoes: string[]
 }
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