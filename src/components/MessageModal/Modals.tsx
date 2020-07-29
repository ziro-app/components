import * as React from "react"
import { ZiroPromptMessage, ZiroWaitingMessage } from "ziro-messages"
import { container, title, svg, buttonsContainer } from "./modalStyle"
import Illustration from "../Illustration"
import Button from "../Button"
import Spinner from "../Spinner"
import { motion } from "framer-motion"
import { defaultProp } from "./defaults"

type CP = {
    message: ZiroPromptMessage<string>|ZiroWaitingMessage<string>
}

const Common: React.FC<CP> = ({ message }) => {

    const text = React.useMemo(() => {
        if(message instanceof ZiroPromptMessage) return message.userDescription + " " + message.userResolution
        return message.userDescription
    },[message])

    return (
        <>
            <motion.div key={message.illustration} {...defaultProp} style={svg}>
                <Illustration type={message.illustration} />
            </motion.div>
            <motion.label key={message.title} {...defaultProp} style={title(message.type)}>
                {message.title}
            </motion.label>
            <motion.label key={text} {...defaultProp} style={{ textAlign: "center" }}>
                {text}
            </motion.label>
        </>
    )
}

type BP = {
    message: ZiroPromptMessage<string>
    onButtonClick: (button: "first"|"second") => void
}

const ButtonsContainer: React.FC<BP> = ({ message, onButtonClick }) => {

    const cta = React.useMemo(() => {
        if(message.firstButton) return message.firstButton.title
        return "ok"
    },[message])

    const buttonsContainerKey = React.useMemo(() => {
        if(message.secondButton) return "doubleButton"
        return "singleButton"
    },[message])

    return (
        <motion.div key={buttonsContainerKey} { ...defaultProp } style={buttonsContainer(!!message.secondButton)}>
            <Button
                type='button'
                click={onButtonClick.bind(null,"first")}
                cta={cta}
            />
            {
                message.secondButton &&
                <Button
                    type='button'
                    click={onButtonClick.bind(null,"second")}
                    cta={message.secondButton.title}
                    template='light'
                />
            }
        </motion.div>
    )
}

type SP = {
    message: ZiroWaitingMessage<string>
    onButtonClick: (button: "first"|"second") => void
}

const SpinnerContainer: React.FC<SP> = ({ message, onButtonClick }) => {

    React.useEffect(() => {
        if(message.promise) {
            message.promise
                .then(() => onButtonClick("first"))
                .catch(() => onButtonClick("second"))
        }
    },[])

    return (
        <motion.div key="spinner" {...defaultProp} style={buttonsContainer(false)}>
            <Spinner/>
        </motion.div>
    )
}

type P = {
    message: ZiroPromptMessage<string>|ZiroWaitingMessage<string>
    onButtonClick: (button: "first"|"second") => void
}

const Modal: React.FC<P> = ({ message, onButtonClick }) => {
    return (
        <div style={container}>
            <Common message={message}/>
            {
                message instanceof ZiroPromptMessage &&
                <ButtonsContainer message={message} onButtonClick={onButtonClick}/>
            }
            {
                message instanceof ZiroWaitingMessage &&
                <SpinnerContainer message={message} onButtonClick={onButtonClick}/>
            }
        </div>
    )
}

export default Modal