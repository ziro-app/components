import React from 'react'
import Modal from '../Modal'
import Button from '../Button'
import Illustration from '../Illustration/index'
import { container, svg, title, modal } from './styles'
import { motion } from 'framer-motion'

const _Modal = ({ isOpen, errorTitle, errorMessage, onRequestClose, illustration='paymentError', buttonName='ok' }) => {
    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={() => {}}
            boxStyle={modal}
        >
            <div style={container}>
                <div style={svg}><Illustration type={illustration} /></div>
                <label style={title}>{errorTitle}</label>
                <label>{errorMessage}</label>
                <Button
                    type='button'
                    click={onRequestClose}
                    cta={buttonName}
                />
            </div>
        </Modal>
    )
}

export default _Modal