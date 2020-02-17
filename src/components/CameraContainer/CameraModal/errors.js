export const

AbortError = {
    title: 'Erro desconhecio',
    message: 'Ocorreu um erro que impossibilitou a abertura da câmera, por favor tente novamente.'
},

NotAllowedError = {
    title: 'Permissão negada',
    message: 'Por favor conceda acesso a câmera através das configurações do seu navegador.'
},

NotFoundError = {
    title: 'Nenhuma câmera encontrada',
    message: 'Nenhum dispositivo para captura de imagens foi encontrado, por favor efetue essa operação em um dispositivo com câmera.'
},

NotReadableError = {
    title: 'Câmera com problemas',
    message: 'Devido a um problema na câmera, ela não pode ser aberta, por favor tente em outro dispositivo.'
},

OverconstrainedError = AbortError,

SecurityError = AbortError,

TypeError = AbortError