export type WriteOptions = {
    range: string
    values: string[][]
    valueInputOption?: "user_entered"|"raw"
    apiMethod?: "append"|"update"|"batchUpdate",
}

export type ReadOptions = {
    range: string
    apiMethod?: "get"|"batchGet"
}