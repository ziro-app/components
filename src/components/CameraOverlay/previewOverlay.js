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
            style={{ height: 'calc(100vh - 40px)', background: 'white', display: 'grid', padding: '20px', gridTemplateRows: 'auto 1fr', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, margin: '0px auto 20px', overflow: 'scroll' }}
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
    onDelete: Proptypes.func,
    onSend: Proptypes.func,
    deleteName: Proptypes.string,
    sendName: Proptypes.string
}

export default PreviewOverlay