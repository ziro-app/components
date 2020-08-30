import React from "react"
import MessageModal, { useMessage, useMessagePromise } from "../../../components/MessageModal"
import { ZiroPromptMessage, ZiroWaitingMessage } from "ziro-messages"

const PromptMessage = new ZiroPromptMessage({
    name: "promptTest",
    type: "neutral",
    code: "1234",
    title: "Teste de modal",
    userDescription: "Essa é uma mensagem de teste para o modal.",
    userResolution: "Deseja continuar?",
    internalDescription: "prompt de teste",
    illustration: "profileData"
})

const WaitingMessage = new ZiroWaitingMessage({
    name: "waitingTest",
    code: "1234",
    title: "Teste de modal",
    userDescription: "Efetuando teste. Aguarde enquanto finalizamos o teste.",
    internalDescription: "teste de waiting message",
    illustration: "waiting"
})

const SuccessMessage = new ZiroPromptMessage({
    name: "successTest",
    type: "success",
    code: "1234",
    title: "Teste de modal",
    userDescription: "O teste foi realizado com sucesso.",
    userResolution: "Clique em ok para sair.",
    internalDescription: "prompt de sucesso",
    illustration: "paymentSuccess"
})

const FailureMessage = new ZiroPromptMessage({
    name: "failureTest",
    type: "destructive",
    code: "1234",
    title: "Teste de modal",
    userDescription: "O teste falhou.",
    userResolution: "Clique em ok para sair.",
    internalDescription: "prompt de falha",
    illustration: "errorLoading"
})

const Child = () => {
    const setPromiseMessage = useMessagePromise()
    const setMessage = useMessage()

    const asyncClick = React.useCallback(async () => {
        try {
            await setPromiseMessage(PromptMessage)
            const promise = new Promise<boolean>((resolve) => {
                setTimeout(() => resolve(Math.random() > 0.5),2000)
            })
            setMessage(WaitingMessage.withPromise(promise))
            const result = await promise
            setMessage(result ? SuccessMessage : FailureMessage)
        }
        catch(error) {

        }
    },[])

    return (
        <div
            style={{ display: 'grid', justifyItems: 'center', marginTop: '20px', fontSize: '21px', cursor: 'pointer' }}
            onClick={asyncClick}
        >
            ABRIR MODAL
        </div>
    )
}

export const DisplayMessageModal = () => {
    return (
        <MessageModal>
            <Child />
        </MessageModal>
    )
}