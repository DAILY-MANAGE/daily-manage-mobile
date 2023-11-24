export interface FormData {
 id?: number,
 nome?: string,
 descricao?: string
 idusuariospermitidos?: number[],
 perguntas?: QuestionData[],
}

export interface QuestionData {
 id?: number,
 resposta?: {resposta: any},
 descricao?: string, 
 tiporespostadefault?: string,
 tiporesposta?: ResponseType | string,
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