import axios from "axios";
import { instanceConfig } from "./constants"
import { WriteOptions, ReadOptions } from "./types"

const sheets = axios.create(instanceConfig)

export default (spreadsheetId: string) => ({
    write: ({ range, values, valueInputOption = 'user_entered'}: WriteOptions) => sheets.post("",{
        apiResource: "values",
        apiMethod: "append",
        range,
        resource: { values },
        valueInputOption,
        spreadsheetId
    }).then(({ data }) => data),
    read: ({ range }: ReadOptions) => sheets.post<string[][]>("",{
        apiResource: "values",
        apiMethod: "get",
        range,
        spreadsheetId
    }).then(({ data }) => data)
})