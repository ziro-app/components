import * as React from "react";
//@ts-ignore
import Illustration from "@bit/vitorbarbosa19.ziro.illustration";
//@ts-ignore
import Button from "@bit/vitorbarbosa19.ziro.button";
//@ts-ignore
import Spinner from "@bit/vitorbarbosa19.ziro.spinner";
import { motion } from "framer-motion";
import { isPrompt, isWaiting } from "ziro-messages";
import { defaultProp } from "./defaults";
import { container, title, svg, buttonsContainer, supportButton } from "./modalStyle";
import { Message, PMessage, WMessage } from "./types";
import { usePerformance, useAnalytics } from "reactfire";

type CP = {
    message: Message;
};

const Common: React.FC<CP> = ({ message }) => {
    const text = React.useMemo(() => {
        if (isPrompt(message) && typeof(message.userResolution) === "string") return message.userDescription + " " + message.userResolution;
        if (isPrompt(message) && typeof(message.userResolution) === "object") {
            return (<>
                {message.userDescription}
                {message.userResolution}
            </>)
        }
        return message.userDescription;
    }, [message]);

    return (
        <>
            <motion.div key={message.illustration} {...defaultProp} style={svg}>
                <Illustration type={message.illustration} />
            </motion.div>
            <motion.label key={message.title} {...defaultProp} style={title(message.type)}>
                {message.title}
            </motion.label>
            <motion.label key={message.userDescription} {...defaultProp} style={{ textAlign: "center" }}>
                {text}
            </motion.label>
        </>
    );
};

type BP = {
    message: PMessage;
    reactfire: boolean;
    onButtonClick: (button: "first" | "second" | "support") => void;
};

const ButtonsContainer: React.FC<BP> = ({ message, onButtonClick, reactfire }) => {
    const analytics = reactfire ? useAnalytics() : undefined;

    const cta = React.useMemo(() => {
        if (message.firstButton) return message.firstButton.title;
        return "ok";
    }, [message]);

    const [second, buttonsContainerKey] = React.useMemo(() => {
        if (message.secondButton) return [true, "doubleButton"];
        return [false, "singleButton"];
    }, [message]);

    const [clickFirst, clickSecond, clickSupport] = React.useMemo(
        () => [() => onButtonClick("first"), () => onButtonClick("second"), () => onButtonClick("support")],
        [onButtonClick],
    );

    React.useEffect(() => {
        const additionalData = JSON.stringify(message.additionalData, null, 4);
        analytics?.logEvent(message.code + " : " + message.name, { ...message.getData(), additionalData });
    }, [message.code]);

    return (
        <motion.div key={buttonsContainerKey} {...defaultProp} style={buttonsContainer(second)}>
            <Button type="button" click={clickFirst} cta={cta} />
            {message.secondButton && <Button type="button" click={clickSecond} cta={message.secondButton.title} template="light" />}
            {message.supportButton && (
                <Button
                    style={supportButton}
                    type="link"
                    cta={message.supportButton === true ? "Falar com Suporte" : message.supportButton.title}
                    navigate={clickSupport}
                />
            )}
        </motion.div>
    );
};

type SP = {
    message: WMessage;
    reactfire: boolean;
    setMessage: (arg: Message | ((message: Message) => Message)) => void;
};

const SpinnerContainer: React.FC<SP> = ({ message, reactfire, setMessage }) => {
    const performance = reactfire ? usePerformance() : undefined;
    React.useEffect(() => {
        if (message.promise) {
            let trace = performance?.trace(message.code + " : " + message.name);
            trace?.start();
            message.promise.finally(() => {
                setMessage((old) => {
                    if (old?.code === message.code) return null;
                    else return old;
                });
                trace?.stop();
                trace = null;
            });
            return () => {
                trace?.stop();
                trace = null;
            };
        } else
            setMessage((old) => {
                if (old.code === message.code) return null;
                else return old;
            });
    }, []);

    return (
        <motion.div key="spinner" {...defaultProp} style={buttonsContainer(false)}>
            <Spinner size="5rem" />
        </motion.div>
    );
};

type P = {
    message: Message;
    reactfire: boolean;
    setMessage: (arg: Message | ((message: Message) => Message)) => void;
    onButtonClick: (button: "first" | "second") => void;
};

const Modal: React.FC<P> = ({ message, onButtonClick, reactfire, setMessage }) => {
    if (!isPrompt(message) && !isWaiting(message)) return null;
    return (
        <div style={container}>
            <Common message={message} />
            {isPrompt(message) && <ButtonsContainer message={message} onButtonClick={onButtonClick} reactfire={reactfire} />}
            {isWaiting(message) && <SpinnerContainer message={message} reactfire={reactfire} setMessage={setMessage} />}
        </div>
    );
};

export default Modal;
