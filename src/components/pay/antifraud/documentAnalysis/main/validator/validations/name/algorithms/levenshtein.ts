// import levenshtein from  "js-levenshtein"
// import { validateAndNormalize } from "./utils"

// function similarity(s1: string,s2: string) {
//     const [longer,shorter] = s1.length > s2.length ? [s1,s2]:[s2,s1]
//     if(longer.length === 0) return 1.0
//     return (longer.length - levenshtein(longer,shorter)) / longer.length
// }

// export const compareNames = (cardName: string, docName: string) => {
//     const [cardNames, docNames] = validateAndNormalize(cardName, docName).map(str => str.split(" ").filter(s => s.length > 2))
//     const matches = docNames.map((docName) => {
//         return cardNames.reduce((prev,cardName) => {
//             const probability = similarity(docName,cardName)
//             if (!prev.probability||prev.probability<probability) return { probability, cardName, docName }
//             else return prev
//         },{} as any)
//     })
//     const totalProbability = matches.reduce((tot,{ probability }) => tot+probability,0)/matches.length
//     return [totalProbability, matches]
// }