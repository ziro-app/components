import { ZiroPromptMessage, ZiroWaitingMessage } from "ziro-messages"
import { MotionProps } from "framer-motion"

export type Message = ZiroPromptMessage<string>|ZiroWaitingMessage<string>
export { ZiroPromptMessage, ZiroWaitingMessage }

export type Rejecter = () => void

export type Context = {
    setMessage: React.Dispatch<React.SetStateAction<Message>>
    setReject: React.Dispatch<React.SetStateAction<Rejecter>>
}

export type Props = {
    overlayConfig?: MotionProps
    boxConfig?: MotionProps
}