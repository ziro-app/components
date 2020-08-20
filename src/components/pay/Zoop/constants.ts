export const

instanceConfig: import("axios").AxiosRequestConfig = {
    baseURL: process.env.PAY,
    headers: { Authorization: `Basic ${process.env.PAY_TOKEN}` },
    timeout: 40000
  }