import React from 'react'
import Camera from '../Camera'
import CameraOverlay from '../CameraOverlay'

const CameraContainer = ({ startOnMount, initialFacingMode }) => {
    return (
        <Camera
            startOnMount={startOnMount}
            initialFacingMode={initialFacingMode}
            onTakePicture={(picture) => console.log({ picture })}
        >
            <CameraOverlay/>
        </Camera>
    )
}

export default CameraContainer