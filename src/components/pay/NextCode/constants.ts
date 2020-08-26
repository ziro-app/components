export const loginConfig: import("axios").AxiosRequestConfig = {
    url: "https://auth.nxcd.com.br/v1.0/login/",
    method: "POST",
    data: {
        email: process.env.NEXTCODE_EMAIL,
        password: process.env.NEXTCODE_PASSWORD,
    },
};

export const instanceConfig: import("axios").AxiosRequestConfig = {
    baseURL: "https://id.nxcd.com.br/v1.0/",
    timeout: 40000,
};

export const URLs = {
    document: "id/extract-all-single-file-url/",
    biometry: "bio/new-face-compare-url/",
};
