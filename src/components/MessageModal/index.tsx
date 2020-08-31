import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { isPrompt, isWaiting, ZiroPromptMessage } from "ziro-messages";
import { container, disableScroll, overlay, box } from "./styles";
import { Props, Message, Rejecter } from "./types";
import { MessagesContext, defaultProps } from "./defaults";

import Modal from "./Modals";

const MessageModal: React.FC<Props> = ({
    children,
    reactfire = false,
    overlayConfig = defaultProps.overlayConfig,
    boxConfig = defaultProps.boxConfig,
}) => {
    const [message, setMessage] = React.useState<Message | null>(null);
    const [reject, setReject] = React.useState<Rejecter | null>(null);

    const onButtonClick = React.useCallback(
        (button: "first" | "second") => {
            let result: Message = null;
            if (isPrompt(message)) {
                if (button === "first") result = message.firstButton?.action() ?? null;
                if (button === "second") result = message.secondButton?.action() ?? null;
            }
            setMessage((old) => {
                if (old.code !== message.code) return old;
                setReject(null);
                return result;
            });
        },
        [setMessage, setReject, message, isPrompt, isWaiting],
    );

    const onOverlayClick = React.useCallback(() => {
        setMessage((currentMessage) => {
            if (isWaiting(currentMessage)) return currentMessage;
            if (isPrompt(currentMessage)) {
                if (reject !== null) reject();
                setReject(null);
                return null;
            }
        });
    }, [setMessage, reject, setReject, isPrompt, isWaiting]);

    return (
        <MessagesContext.Provider value={{ setMessage, setReject }}>
            {children}
            <AnimatePresence exitBeforeEnter>
                {!!message && (
                    <div style={container}>
                        <motion.div key="overlay" style={overlay} onClick={onOverlayClick} {...overlayConfig} />
                        <motion.div key="box" style={box} {...boxConfig}>
                            <Modal
                                message={message}
                                onButtonClick={onButtonClick}
                                reactfire={reactfire}
                                setMessage={setMessage}
                            />
                        </motion.div>
                        <style>{disableScroll}</style>
                    </div>
                )}
            </AnimatePresence>
        </MessagesContext.Provider>
    );
};

export const useMessage = () => {
    const { setMessage } = React.useContext(MessagesContext);
    return setMessage;
};

export function useMessagePromise() {
    const { setMessage, setReject } = React.useContext(MessagesContext);
    return React.useCallback(
        (message: ZiroPromptMessage<string, string, any>, keys: [string, string] = ["sim", "não"]) => {
            return new Promise<void>((resolve, reject) => {
                setReject(() => () => reject());
                setMessage(
                    message.withButtons([
                        { title: keys[0], action: () => resolve() },
                        { title: keys[1], action: () => reject() },
                    ]),
                );
            });
        },
        [setMessage],
    );
}

export default MessageModal;
