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
 tiporesposta?: "STRING" | "BOOLEAN" | "INTEGER" | "DECIMAL" | "CELSIUS" | "KILOGRAM" | "PERCENT" | "LITER" | undefined
 opcional?: boolean
}

export enum ResponseType {
 INTEGER,
 DECIMAL,
 STRING,
 BOOLEAN,
 CELSIUS,
 LITER,
 KILOGRAM,
 PERCENT
}