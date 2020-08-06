import { AxiosRequestConfig } from "axios"

export const instanceConfig: AxiosRequestConfig = {
    baseURL: process.env.WHATS_URL,
    headers: {
      Authorization: process.env.WHATS_TOKEN,
      'Content-Type': 'application/json',
    },
    timeout: 40000
}