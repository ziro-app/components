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
    const [, setReject] = React.useState<Rejecter | null>(null);

    const onButtonClick = React.useCallback(
        (button: "first" | "second") => {
            setMessage((currentMessage) => {
                if (isPrompt(currentMessage)) {
                    setReject(null);
                    if (button === "first") return currentMessage.firstButton?.action() ?? null;
                    if (button === "second") return currentMessage.secondButton?.action() ?? null;
                }
                return null;
            });
        },
        [setMessage, setReject, isPrompt],
    );

    const onOverlayClick = React.useCallback(() => {
        setMessage((currentMessage) => {
            if (isPrompt(currentMessage)) {
                setReject((currentReject) => {
                    if (currentReject) currentReject();
                    return null;
                });
                return null;
            }
            return currentMessage;
        });
    }, [setMessage, setReject, isPrompt]);

    return (
        <MessagesContext.Provider value={{ setMessage, setReject }}>
            {children}
            <AnimatePresence exitBeforeEnter>
                {!!message && (
                    <div style={container}>
                        <motion.div key="overlay" style={overlay} onClick={onOverlayClick} {...overlayConfig} />
                        <motion.div key="box" style={box} {...boxConfig}>
                            <Modal message={message} onButtonClick={onButtonClick} reactfire={reactfire} setMessage={setMessage} />
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

MessageModal.displayName = "MessageModal";

export default MessageModal;
