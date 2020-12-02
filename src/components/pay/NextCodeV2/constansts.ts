export const instanceConfig: import("axios").AxiosRequestConfig = {
  baseURL: "https://api.nxcd.app/",
  timeout: 40000,
  headers: { 'Authorization': "ApiKey " + process.env.NEXTCODE_TOKEN_V2 }
}

export const URLs = {
  classify: "classify/",
};