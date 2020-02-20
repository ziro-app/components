import React from 'react'
import Proptypes from 'prop-types'
import { AnimatePresence } from 'framer-motion'
import PreviewOverlay from './previewOverlay'
import ShooterOverlay from './shooterOverlay'

const CameraOverlay = ({ turnOn, turnOff, takePicture, deletePicture, isOnPreview, cameraState, onSend, onClose, allowSwap }) => {

    return (
        <AnimatePresence>
            {
                isOnPreview ?

                <PreviewOverlay
                    onDelete={deletePicture}
                    onSend={onSend}
                />

                :

                <ShooterOverlay
                    takePicture={takePicture}
                    turnOn={turnOn}
                    turnOff={turnOff}
                    cameraState={cameraState}
                    onClose={onClose}
                    allowSwap={allowSwap}
                />
                
            }
        </AnimatePresence>
    )
}

CameraOverlay.propTypes = {
    turnOn: Proptypes.func.isRequired,
    turnOff: Proptypes.func.isRequired,
    takePicture: Proptypes.func.isRequired,
    deletePicture: Proptypes.func.isRequired,
    isOnPreview: Proptypes.bool,
    cameraState: Proptypes.string,
    onSend: Proptypes.func,
    onClose: Proptypes.func,
    allowSwap: Proptypes.bool
}

export default CameraOverlay