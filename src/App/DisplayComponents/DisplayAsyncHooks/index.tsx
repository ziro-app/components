import * as React from "react"
import { useAsyncEffect } from "../../../components/utils/asyncHooks"

export const DisplayAsyncHooks = () => {
    
    const [clicks,setClicks] = React.useState(0)

    const effectState = useAsyncEffect(async () => {
        console.log(`click ${clicks} is begining`)
        return await new Promise((resolve,reject) => {
            setTimeout(() => Math.random() > 0.5 ? resolve(`click ${clicks} resolved`) : reject(`click ${clicks} rejected`),10000*Math.random())
        })
    },[clicks])

    console.log(effectState)

    return (
        <div style={{ height: '100vh', width: '100vw', color: "blue" }} onClick={() => setClicks(c => c+1)}></div>
    )


}