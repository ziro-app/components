import React from 'react'
import Proptypes from 'prop-types'
import { AnimatePresence } from 'framer-motion'
import PreviewOverlay from './previewOverlay'
import ShooterOverlay from './shooterOverlay'

const CameraOverlay = ({ turnOn, turnOff, takePicture, deletePicture, isOnPreview, cameraState, onSend, onClose, allowSwap, deleteName, sendName }) => {

    return (
        <AnimatePresence>
            {
                isOnPreview ?

                <PreviewOverlay
                    onDelete={deletePicture}
                    onSend={onSend}
                    deleteName={deleteName}
                    sendName={sendName}
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
    allowSwap: Proptypes.bool,
    deleteName: Proptypes.string,
    sendName: Proptypes.string
}

export default CameraOverlay