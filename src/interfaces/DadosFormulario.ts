export interface DadosFormulario {
 id?: number,
 nome?: string,
 descricao?: string
 usuariosPermitidos?: number,
 perguntas?: Pergunta[],
}

export interface Pergunta {
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