import React, { useState } from 'react'
import Proptypes from 'prop-types'
import Camera from '../Camera'
import CameraOverlay from '../CameraOverlay'
import CameraFallback from '../CameraFallback'
import CameraModal from './CameraModal'
import * as errors from './errors'

const CameraContainer = ({ startOnMount, initialFacingMode, onSend, onClose, sendName, deleteName, allowSwap, fallbackComponent, previewEnterAnimation }) => {

    const [error, setError] = useState(null)
    const [picture, setPicture] = useState()

    return (
        <Camera
            startOnMount={startOnMount}
            initialFacingMode={initialFacingMode}
            onTakePicture={setPicture}
            onError={({ name }) => setError(errors[name])}
            fallbackComponent={fallbackComponent || <CameraFallback/>}
            previewEnterAnimation={previewEnterAnimation}
        >
            <CameraOverlay
                onSend={() => onSend(picture)}
                onClose={onClose}
                allowSwap={allowSwap}
                sendName={sendName}
                deleteName={deleteName}
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