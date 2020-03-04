import React from 'react'
import Proptypes from 'prop-types'
import { motion } from 'framer-motion'
import ImagePreview from '../ImagePreview'
import Header from '../Header'

const PreviewOverlay = ({ picture, deletePicture, onAccept }) => {

    return (
        <motion.div
            initial={{ scale: window.innerWidth/(window.innerWidth-40) }}
            animate={{ scale: 1 }}
            style={{ background: 'white', display: 'grid', padding: '20px', gridGap: '20px', gridTemplateRows: 'auto 1fr', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}
        >
            <Header type='title-only' title='Preview'/>
            <ImagePreview
                picture={picture}
                primaryIcon='check'
                primaryAction={onAccept}
                secondaryIcon='trash'
                secondaryAction={deletePicture}
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