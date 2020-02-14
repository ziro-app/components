import React from 'react'
import { AnimatePresence } from 'framer-motion'
import PreviewOverlay from './previewOverlay'
import ShooterOverlay from './shooterOverlay'

const CameraOverlay = ({ turnOn, turnOff, takePicture, deletePicture, isOnPreview, cameraState, onSend }) => {

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
                />
                
            }
        </AnimatePresence>
    )
}

export default CameraOverlay