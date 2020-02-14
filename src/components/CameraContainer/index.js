import React from 'react'
import Camera from '../Camera'
import CameraOverlay from '../CameraOverlay'

const CameraContainer = ({ startOnMount, initialFacingMode, onSend, onClose, onTakePicture, allowSwap }) => {
    return (
        <Camera
            startOnMount={startOnMount}
            initialFacingMode={initialFacingMode}
            onTakePicture={onTakePicture}
        >
            <CameraOverlay
                onSend={onSend}
                onClose={onClose}
                allowSwap={allowSwap}
            />
        </Camera>
    )
}

export default CameraContainer