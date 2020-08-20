import axios, { CancelToken } from "axios";
import { instanceConfig } from "./constants"
import { request, response } from "./interceptors"
import { ZoopCard } from "./types"

const zoop = axios.create(instanceConfig);

zoop.interceptors.request.use(request.onFulfilled,request.onRejected)
zoop.interceptors.response.use(response.onFulfilled,response.onRejected)

export { ZoopCard }
export default zoop

export const getCard = (card_id: string, cancelToken?: CancelToken) =>
    zoop.get<never, ZoopCard.Info>('/card-read', { params: { card_id }, cancelToken })