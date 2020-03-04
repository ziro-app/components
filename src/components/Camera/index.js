import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { shadow } from '@ziro/theme'
import { useCamera, useDisablePinchZoomEffect } from './useCamera'
import { container, overlay, animateContainer } from './styles'

const Camera = ({
    children,
    initialFacingMode,
    startOnMount,
    onTakePicture,
    onError,
    fallbackComponent,
    previewComponent
}) => {

    const [picture, videoRef, canvasRef, turnOn, turnOff, takePicture, deletePicture, cameraState] = useCamera(onTakePicture,onError,startOnMount,initialFacingMode)

    useDisablePinchZoomEffect()

    return (
        <div style={animateContainer}>
            <div key='container' style={container('black')}>
                <canvas hidden={true} ref={canvasRef}/>
                <video
                    style={{ objectFit: 'cover' }}
                    ref={videoRef}
                    hidden={!!picture}
                    autoPlay
                />
            </div>
            <div key='fallback' style={overlay}>
                { !(videoRef.current && videoRef.current.srcObject) && fallbackComponent }
            </div>
            <div key='cameraOverlay' style={overlay}>
                {
                    children && !picture &&
                    React.Children.map(children, (child) => 
                        React.cloneElement(child, {
                            turnOn: (facingMode) => turnOn(facingMode||initialFacingMode),
                            turnOff,
                            takePicture,
                            cameraState
                        })
                    )
                }
            </div>
            {
                picture &&
                <div key='previewOverlay' style={overlay}>
                    { React.cloneElement(previewComponent, { picture, deletePicture, videoRect: videoRef.current && videoRef.current.getBoundingClientRect() }) }
                </div>
            }
        </div>
    )

}

Camera.propTypes = {
    initialFacingMode: PropTypes.string,
    startOnMount: PropTypes.bool,
    onTakePicture: PropTypes.func,
    onError: PropTypes.func,
    fallbackComponent: PropTypes.element,
    previewBackground: PropTypes.string,
    previewEnterAnimation: PropTypes.object,
    previewExitAnimation: PropTypes.object
}

export default Camera