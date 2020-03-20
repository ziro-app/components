import React from 'react'
import Proptypes from 'prop-types'
import { motion } from 'framer-motion'
import ImagePreview from '../ImagePreview'
import { headerContainer } from '../FlowManager/styles'

const PreviewOverlay = ({ picture, deletePicture, onAccept }) => {

    return (
        <motion.div
            initial={{ scale: window.innerWidth/(window.innerWidth-40) }}
            animate={{ scale: 1 }}
            style={{ background: 'white', display: 'grid', padding: '70px 20px 20px 20px', gridGap: '20px', gridTemplateRows: 'auto 1fr', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}
        >
            <div style={{ ...headerContainer, display: 'grid', height: 50, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', maxWidth: '500px', margin: 'auto' }}>
                <label style={{ textAlign: 'center', fontSize: '1.8rem' }}>Preview</label>
            </div>
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