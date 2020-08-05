import { AxiosRequestConfig } from "axios"

export const instanceConfig: AxiosRequestConfig = {
    baseURL: process.env.SHEET_URL,
    headers: {
        Authorization: process.env.SHEET_TOKEN,
        'Content-Type': 'application/json',
    },
    timeout: 40000
}