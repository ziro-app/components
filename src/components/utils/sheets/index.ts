import axios from "axios";
import { instanceConfig } from "./constants"
import { WriteOptions, ReadOptions } from "./types"

const sheets = axios.create(instanceConfig)

export const sheet = (spreadsheetId: string) => ({
    write: ({ apiMethod = "append", range, values, valueInputOption = 'user_entered'}: WriteOptions) => sheets.post("",{
        apiResource: "values",
        apiMethod,
        range,
        resource: { values },
        valueInputOption,
        spreadsheetId
    }).then(({ data }) => data),
    read: ({ range, apiMethod = "get" }: ReadOptions) => sheets.post<{ values: string[][] }>("",{
        apiResource: "values",
        apiMethod,
        range,
        spreadsheetId
    }).then(({ data: { values } }) => values)
})

export default sheets