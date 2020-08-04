import * as React from "react"
import { Context, Props } from "./types"
import { MotionProps } from "framer-motion"

function throwError() {
    throw 'This component is not wrapped in the message provider'
}

export const MessagesContext = React.createContext<Context>({
    setMessage: throwError,
    setReject: throwError
})

export const defaultProps: Props = {
    overlayConfig: {
        transition: { type: "spring", damping: 32, stiffness: 450 },
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    },
    boxConfig: {
        transition: { type: "spring", damping: 32, stiffness: 320 },
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 }
    }
}

export const defaultProp: MotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}