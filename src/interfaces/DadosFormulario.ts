export interface DadosFormulario {
 id?: number,
 nome?: string,
 usuariosPermitidos?: number,
 campos?: Pergunta[],
 informacoes?: string
}

export interface Pergunta {
 descricao?: string, 
 unidade?: Unidade,
 opcional?: boolean
}

export enum Unidade {
 INTEGER,
 DECIMAL,
 STRING,
 BOOLEAN, 
 CELSIUS,
 LITER,
 KILOGRAM, 
 PERCENT
}