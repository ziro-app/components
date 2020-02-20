import React, { useState } from 'react'
import Proptypes from 'prop-types'
import Camera from '../Camera'
import CameraOverlay from '../CameraOverlay'
import CameraFallback from '../CameraFallback'
import CameraModal from './CameraModal'
import * as errors from './errors'

const CameraContainer = ({ startOnMount, initialFacingMode, onSend, onClose, onTakePicture, allowSwap }) => {

    const [error, setError] = useState(null)

    return (
        <Camera
            startOnMount={startOnMount}
            initialFacingMode={initialFacingMode}
            onTakePicture={onTakePicture}
            onError={({ name }) => setError(errors[name])}
            fallbackComponent={<CameraFallback/>}
        >
            <CameraOverlay
                onSend={onSend}
                onClose={onClose}
                allowSwap={allowSwap}
            />
            <CameraModal
                isOpen={!!error}
                errorTitle={error && error.title}
                errorMessage={error && error.message}
                onRequestClose={() => setError(null)}
            />
        </Camera>
    )
}

CameraContainer.propTypes = {
    startOnMount: Proptypes.bool,
    initialFacingMode: Proptypes.string,
    onSend: Proptypes.func.isRequired,
    onClose: Proptypes.func.isRequired,
    onTakePicture: Proptypes.func,
    allowSwap: Proptypes.bool
}

export default CameraContainer