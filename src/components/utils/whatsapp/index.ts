//@ts-nocheck
import axios, { AxiosResponse } from "axios";
import { instanceConfig } from "./constants"
import { WhatsappOptions } from "./types"

const whatsapp = axios.create(instanceConfig)

type PromiseSettledResult<T> = { status: "fulfilled", value: T }|{ status: "rejected", reason: any }

type WhatsReturn<R extends string|string[]> = R extends string[] ? Promise<PromiseSettledResult<AxiosResponse<any>>[]> : Promise<AxiosResponse<any>>
export const sendWhats = function<R extends string|string[]>({ recipients, ...rest }:WhatsappOptions<R>): WhatsReturn<R> {
    if(Array.isArray(recipients)) return Promise.allSettled(recipients.map(recipient => whatsapp.post("",{ recipient, ...rest }))) as any
    else return whatsapp.post("",{ recipient: recipients, ...rest }) as any
}

export default whatsapp