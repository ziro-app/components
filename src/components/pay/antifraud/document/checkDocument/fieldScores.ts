import { Document, is} from "@bit/vitorbarbosa19.ziro.pay.next-code"

export default (fieldsScores?: Document.Scores.Fields) => {
    if(is.Scores(fieldsScores)) console.log('fields are scored', fieldsScores)
    else console.log('fields are not scored')
}