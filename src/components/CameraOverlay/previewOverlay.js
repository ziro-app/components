import React from 'react'
import Proptypes from 'prop-types'
import { motion } from 'framer-motion'
import Button from '../Button'
import { previewContainer } from './styles'

const PreviewOverlay = ({ onDelete, onSend, deleteName, sendName }) => {
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
                type='button'
                cta={deleteName||'excluir'}
                template='destructive'
                click={onDelete}
            />
            <Button
                type='button'
                cta={sendName||'enviar'}
                click={onSend}
            />
        </motion.div>
    )
}

PreviewOverlay.propTypes = {
    onDelete: Proptypes.func.isRequired,
    onSend: Proptypes.func.isRequired,
    deleteName: Proptypes.string,
    sendName: Proptypes.string
}

export default PreviewOverlay