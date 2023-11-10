export interface DadosFormulario {
 id?: number,
 nome?: string,
 descricao?: string
 idusuariospermitidos?: number,
 perguntas?: Perguntas[],
}

export interface Perguntas {
 descricao?: string, 
 tiporesposta?: TipoResposta,
 opcional?: boolean
}

export enum TipoResposta {
 INTEGER,
 DECIMAL,
 STRING,
 BOOLEAN, 
 CELSIUS,
 LITER,
 KILOGRAM, 
 PERCENT
}