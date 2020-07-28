import * as React from "react"
import { Context, Props } from "./types"
import { MotionProps } from "framer-motion"

const errorMsg = "THE APP IS NOT WRAPPED IN THE MESSAGE MODAL COMPONENT"

export const MessagesContext = React.createContext<Context>({
    setMessage: () => console.error(errorMsg),
    setReject: () => console.error(errorMsg)
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