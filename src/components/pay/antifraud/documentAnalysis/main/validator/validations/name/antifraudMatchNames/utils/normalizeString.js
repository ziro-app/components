// remove accents from string
const normalizeString = string => string.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim().toUpperCase()

export default normalizeString