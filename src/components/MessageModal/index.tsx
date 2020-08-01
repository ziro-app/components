import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { container, disableScroll, overlay, box } from "./styles"
import { Props, Message, ZiroPromptMessage, Rejecter, ZiroWaitingMessage } from "./types"
import { MessagesContext, defaultProps } from "./defaults"

import Modal from "./Modals"

const MessageModal: React.FC<Props> = ({
    children,
    performance,
    overlayConfig = defaultProps.overlayConfig,
    boxConfig = defaultProps.boxConfig
}) => {
    
    const [message,setMessage] = React.useState<Message|null>(null)
    const [reject,setReject] = React.useState<Rejecter|null>(null)

    const onButtonClick = React.useCallback((button: "first"|"second") => {
        if(message instanceof ZiroPromptMessage) {
            switch(button) {
                case "first":
                    if(message.firstButton?.action) {
                        const result = message.firstButton.action()
                        if((result instanceof ZiroPromptMessage)||(result instanceof ZiroWaitingMessage)) {
                            setMessage(result)
                            return
                        }
                    }
                case "second":
                    if(message.secondButton?.action) {
                        const result = message.secondButton.action()
                        if((result instanceof ZiroPromptMessage)||(result instanceof ZiroWaitingMessage)) {
                            setMessage(result)
                            return
                        }
                    }
            }
        }
        setReject(null)
        setMessage(null)
    },[setMessage,message])

    const onOverlayClick = React.useCallback(() => {
        if(message instanceof ZiroWaitingMessage) return
        if(message instanceof ZiroPromptMessage) {
            if(reject!==null) reject()
            setReject(null)
            setMessage(null)
        }
    },[message, setMessage, reject, setReject])

    return (
        <MessagesContext.Provider value={{ setMessage, setReject }}>
            {children}
            <AnimatePresence exitBeforeEnter>
                {
                    !!message &&
                    <div style={container}>
                        <motion.div key="overlay" style={overlay} onClick={onOverlayClick} {...overlayConfig}/>
                        <motion.div key="box" style={box} {...boxConfig}>
                            <Modal message={message} onButtonClick={onButtonClick} performance={performance}/>
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

export function useMessagePromise() {
    const { setMessage, setReject } = React.useContext(MessagesContext)
    return React.useCallback((message: ZiroPromptMessage<string,string,any>, keys: [string,string] = ["sim","não"]) => {
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