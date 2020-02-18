import React from 'react'
import Modal from '../../Modal'
import Illustration from '../../Illustration/index'
import { container, svg, title, modal } from './styles'
import { motion } from 'framer-motion'
import { btn } from '../../Button/styles'

const CameraModal = ({ isOpen, errorTitle, errorMessage, onRequestClose, illustration='paymentError' }) => {
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
                <motion.a
                    style={btn}
                    exit={{}}
                    whileTap={{ scale: 0.95 }}
                    onClick={onRequestClose}
                >ok</motion.a>
            </div>
        </Modal>
    )
}

export default CameraModal