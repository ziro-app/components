/**
 * essa função extrai uma data em ms a partir de uma string formatada como dd/MM/YYYY
 * @param str a string contendo uma data
 */
export function dateFromString(str: string): number {
    const [day, month, year] = str.split("/").map((i) => parseInt(i));
    return new Date(year, month - 1, day).getTime();
}

/**
 * essa função retorna um valor em ms de uma data estabelecida subtraindo o threshold da data atual
 * @param years o thrsehold em anos
 */
export function dateFromThreshold(years: number): number {
    const today = new Date();
    return today.setFullYear(today.getFullYear() - years);
}
