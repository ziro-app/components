import React from 'react'
import Modal from '../Modal'
import Button from '../Button'
import Illustration from '../Illustration/index'
import { container, svg, titleSuccess, titleError, modal } from './styles'
import { motion } from 'framer-motion'

const _Modal = ({
    isOpen,
    type = 'error',
    title = 'Erro',
    message = 'Ocorreu um erro desconhecido',
    firstButtonTitle = 'ok',
    firstButtonAction,
    secondButtonTitle,
    secondButtonAction,
    illustration = 'paymentError'
}) => {
    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={() => {}}
            boxStyle={modal}
        >
            <div style={container}>
                <div style={svg}><Illustration type={illustration} /></div>
                <label style={type==='success'?titleSuccess:titleError}>{title}</label>
                <label>{message}</label>
                <div style={{ display: 'grid', gridTemplateColumns: secondButtonTitle ? '1fr 1fr' : '1fr', gridGap: '10px' }}>
                    <Button
                        type='button'
                        click={firstButtonAction}
                        cta={firstButtonTitle}
                    />
                    {
                        secondButtonTitle &&
                        <Button
                            type='button'
                            click={secondButtonAction}
                            cta={secondButtonTitle}
                            template='light'
                        />
                    }
                </div>
            </div>
        </Modal>
    )
}

export default _Modal