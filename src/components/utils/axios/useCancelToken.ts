import { useState, useEffect } from "react"
import axios from "axios"

const USER_LEFT_PAGE = "__USER_LEFT_PAGE__"

export const useCancelToken = () => {
    const [source] = useState(axios.CancelToken.source())
    useEffect(() => () => source && source.cancel(USER_LEFT_PAGE),[source])
    return source
}

export const isLeftThePageCancel = function(value: any): boolean {
    return axios.isCancel(value) && value.message === USER_LEFT_PAGE
}