import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { container, disableScroll, overlay, box } from "./styles"
import { Props, Message, ZiroPromptMessage, Rejecter } from "./types"
import { MessagesContext, defaultProps } from "./defaults"

import Modal from "./Modals"

const MessageModal: React.FC<Props> = ({ children, overlayConfig = defaultProps.overlayConfig, boxConfig = defaultProps.boxConfig }) => {
    
    const [message,setMessage] = React.useState<Message|null>(null)
    const [reject,setReject] = React.useState<Rejecter|null>(null)

    const onButtonClick = React.useCallback((button: "first"|"second") => {
        if(message instanceof ZiroPromptMessage) {
            if(button === "first") message.firstButton && message.firstButton.action()
            if(button === "second") message.secondButton && message.secondButton.action()
        }
        setReject(null)
        setMessage(null)
    },[setMessage,message])

    const onOverlayClick = React.useCallback(() => {
        if(reject!==null) reject()
        setReject(null)
        setMessage(null)
    },[setMessage, reject])

    return (
        <MessagesContext.Provider value={{ setMessage, setReject }}>
            {children}
            <AnimatePresence exitBeforeEnter>
                {
                    !!message &&
                    <div style={container}>
                        <motion.div key="overlay" style={overlay} onClick={onOverlayClick} {...overlayConfig}/>
                        <motion.div key="box" style={box} {...boxConfig}>
                            <Modal message={message} onButtonClick={onButtonClick}/>
                        </motion.div>
                        <style>{disableScroll}</style>
                    </div>
                }
            </AnimatePresence>
        </MessagesContext.Provider>
    )
}

export const useMessage = () => {
    const { setMessage } = React.useContext(MessagesContext)
    return setMessage
}

export const useMessagePromise = () => {
    const { setMessage, setReject } = React.useContext(MessagesContext)
    return React.useCallback((message: ZiroPromptMessage, keys: [string,string] = ["sim","não"]) => {
        return new Promise<void>((resolve,reject) => {
            setReject(() => () => reject())
            setMessage(message.withButtons([
                { title: keys[0], action: () => resolve() },
                { title: keys[1], action: () => reject()  }
            ]))
        })
    },[setMessage])
}

export default MessageModal