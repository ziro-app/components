

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

/**
 * Separa uma string que contem várias substrings separados por espaço, retorna um array com todas as substrings
 * @param str A string que se deseja separar
 */
export const split = (str: string) => str.split(" ")

/**
 * Separa uma string que contém várias substrings separadas por espaço, retorna a prmeira e a última substring
 * @param str A string que se deseja separar
 */
export const getFirstAndLast = (str: string) => {
    const names = split(str)
    const first = names.shift()
    const last = names.pop()
    return [first,last] as [string,string]
}