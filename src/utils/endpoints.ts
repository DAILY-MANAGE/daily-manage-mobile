export const BASEURL = 'http://192.168.56.1:8080'

export const REGISTRO = "/auth/registro"

export const LOGIN = "/auth/login"
export const RENOVAR_TOKEN = "/auth/renovarToken"
export const VER_TODAS_PERMISSOES = "/permissoes/todas"

export const CRIAR_EQUIPE = "/equipes/criar"
export const VER_EQUIPES_CRIADAS = "/equipes/todas/criadas"
export const VER_EQUIPES_MEMBRO = "/equipes/todas/membro"

export const VER_EQUIPE_POR_ID = "/equipes/{equipeId}"

export const ADICONAR_USUARIO_A_EQUIPE = "/equipes/usuarios"
export const REMOVER_USUARIO_DA_EQUIPE = "/equipes/usuarios/{usuarioId}"
export const FILTRAR_USUARIOS_DA_EQUIPE = "/equipes/usuarios/procurar"

export const ACEITAR_CONVITE = "/equipes/convites"
export const REJEITAR_CONVITE = "/equipes/convites"

export const EDITAR_PERMISSOES_DE_UM_USUARIO_POR_USUaARIO = "/equipes/usuarios/usuario/{usuario}"
export const REMOVER_USUARIO_DA_EQUIPE_POR_USUARIO = "/equipes/usuarios/usuario/{usuario}"

export const EXCLUIR_EQUIPE = "/equipes/excluir"
export const EDITAR_EQUIPE = "/equipes/editar"

export const CRIAR_FORMULARIO = "/equipes/formularios/criar"
export const VER_FORMULARIOS_DA_EQUIPE = "/equipes/formularios/todos"
export const VER_FORMULARIO_POR_ID = "/equipes/formularios"
export const EDITAR_FORMULARIO = "/equipes/formularios"
export const EXCLUIR_FORMULARIO = "/equipes/formularios"
export const RESPONDER_FORMULARIO = "/equipes/formularios"
export const VER_RESPOSTAS_DE_UM_FORMULARIO = "/equipes/formularios"
export const VER_RESPOSTA_POR_ID = "/equipes/formularios/respostas/{formularioRespondidoId}"
export const EDITAR_RESPOSTA = "/equipes/formularios/respostas/{formularioRespondidoId}"
export const EXCLUIR_RESPOSTA = "/equipes/formularios/respostas/{formularioRespondidoId}"

export const FILTRAR_USUARIOS = "/usuarios/procurar"
export const VER_REGISTROS_DE_UM_USUARIO = "/equipes/{usuarioId}/registros"

export const VER_NOTIFICACOES = "/notificacoes/todas"

