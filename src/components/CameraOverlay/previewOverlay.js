import React from 'react'
import Proptypes from 'prop-types'
import { motion } from 'framer-motion'
import Button from '../Button'
import { previewContainer } from './styles'

const PreviewOverlay = ({ onDelete, onSend }) => {
    return (
        <motion.div
            key='previewButtons'
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ type: 'tween' }}
            style={previewContainer}
        >
            <Button
                type='click'
                cta='excluir'
                click={onDelete}
            />
            <Button
                type='click'
                cta='enviar'
                click={onSend}
            />
        </motion.div>
    )
}

PreviewOverlay.propTypes = {
    onDelete: Proptypes.func.isRequired,
    onSend: Proptypes.func.isRequired
}

export default PreviewOverlay