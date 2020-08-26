import * as React from "react";
//@ts-ignore
import Illustration from "@bit/vitorbarbosa19.ziro.illustration";
//@ts-ignore
import Button from "@bit/vitorbarbosa19.ziro.button";
//@ts-ignore
import Spinner from "@bit/vitorbarbosa19.ziro.spinner";
import { motion } from "framer-motion";
import { isPrompt, isWaiting, ZiroPromptMessage, ZiroWaitingMessage } from "ziro-messages";
import { defaultProp } from "./defaults";
import { container, title, svg, buttonsContainer } from "./modalStyle";
import { Message, PMessage, WMessage } from "./types";
import { performance } from "firebase";
import { usePerformance, useAnalytics } from "reactfire";

type CP = {
    message: Message;
};

const Common: React.FC<CP> = ({ message }) => {
    const text = React.useMemo(() => {
        if (isPrompt(message)) return message.userDescription + " " + message.userResolution;
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
            <motion.label key={text} {...defaultProp} style={{ textAlign: "center" }}>
                {text}
            </motion.label>
        </>
    );
};

type BP = {
    message: PMessage;
    onButtonClick: (button: "first" | "second") => void;
};

const ButtonsContainer: React.FC<BP> = ({ message, onButtonClick }) => {
    const analytics = useAnalytics();

    const cta = React.useMemo(() => {
        if (message.firstButton) return message.firstButton.title;
        return "ok";
    }, [message]);

    const [second, buttonsContainerKey] = React.useMemo(() => {
        if (message.secondButton) return [true, "doubleButton"];
        return [false, "singleButton"];
    }, [message]);

    React.useEffect(() => {
        analytics.logEvent(message.code + " : " + message.name, {
            messageData: JSON.stringify(message.additionalData, null, 4),
        });
    }, [message.code]);

    return (
        <motion.div key={buttonsContainerKey} {...defaultProp} style={buttonsContainer(second)}>
            <Button type="button" click={onButtonClick.bind(null, "first")} cta={cta} />
            {message.secondButton && (
                <Button
                    type="button"
                    click={onButtonClick.bind(null, "second")}
                    cta={message.secondButton.title}
                    template="light"
                />
            )}
        </motion.div>
    );
};

type SP = {
    message: WMessage;
    performance?: performance.Performance;
    onButtonClick: (button: "first" | "second") => void;
};

const SpinnerContainer: React.FC<SP> = ({ message, onButtonClick }) => {
    const performance = usePerformance();
    React.useEffect(() => {
        if (message.promise) {
            const trace = performance.trace(message.code + " : " + message.name);
            trace.start();
            message.promise
                .then(() => onButtonClick("first"))
                .catch(() => onButtonClick("second"))
                .finally(() => trace.stop());
        } else onButtonClick("second");
    }, []);

    return (
        <motion.div key="spinner" {...defaultProp} style={buttonsContainer(false)}>
            <Spinner />
        </motion.div>
    );
};

type P = {
    message: Message;
    onButtonClick: (button: "first" | "second") => void;
};

const Modal: React.FC<P> = ({ message, onButtonClick }) => {
    if (!isPrompt(message) && !isWaiting(message)) return null;
    return (
        <div style={container}>
            <Common message={message} />
            {isPrompt(message) && <ButtonsContainer message={message} onButtonClick={onButtonClick} />}
            {isWaiting(message) && <SpinnerContainer message={message} onButtonClick={onButtonClick} />}
        </div>
    );
};

export default Modal;
