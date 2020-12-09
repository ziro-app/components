import { ZiroPromptMessage, ZiroWaitingMessage } from "ziro-messages";
import { MotionProps } from "framer-motion";

export type PMessage<C = string, N = string, D = any> = ZiroPromptMessage<C, N, D>;
export type WMessage<C = string, N = string, D = any> = ZiroWaitingMessage<C, N, D>;
export type Message<C = string, N = string, D = any> = PMessage<C, N, D> | WMessage<C, N, D>;

export type Rejecter = () => void;

export type Context = {
    setMessage: React.Dispatch<React.SetStateAction<Message>>;
    setReject: React.Dispatch<React.SetStateAction<Rejecter>>;
};

export type Props = {
    reactfire?: boolean;
    overlayConfig?: MotionProps;
    boxConfig?: MotionProps;
};
