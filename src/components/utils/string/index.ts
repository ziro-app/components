

/**
 * Verifica se a string é composta por um primeiro nome com três ou mais letras, zero ou mais nomes do meio com uma ou mais letras,
 * e um último nome com três ou mais letras, retorna um booleano
 * @param potentialName A string que se deseja verificar
 */
export const isFullName = (potentialName: string) => /^([a-zA-Z,.'-]{3,} [a-zA-Z,.'-\s]*[a-zA-Z,.'-]{3,})+$/g.test(potentialName)

/**
 * Normaliza a string retirando todos os acentos, retirando os espaços de ambos os lados e transformando tudo para letras minúsculas
 * @param str A string que se deseja normalizar
 */
export const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim().toUpperCase()