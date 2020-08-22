import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop"

export const formatExpiry  = ({ expiration_month, expiration_year }: ZoopCard.Info) => {
    const month = expiration_month.length === 1 ? `0${expiration_month}`:expiration_month
    const year = expiration_year.slice(2)
    return `${month}/${year}`
}