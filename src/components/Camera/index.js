import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { shadow } from '@ziro/theme'
import { useCamera, useDisablePinchZoomEffect } from './useCamera'
import { container, overlay } from './styles'

const Camera = ({
    children,
    initialFacingMode,
    startOnMount,
    onTakePicture,
    onError,
    previewBackground = 'white',
    previewEnterAnimation = { scale: 0.8, translateY: '-8%', boxShadow: shadow },
    previewExitAnimation = { scale: 1.2, translateY: '8%' }
}) => {

    const [picture, videoRef, canvasRef, turnOn, turnOff, takePicture, deletePicture, cameraState] = useCamera(onTakePicture,onError)

    useEffect(() => { startOnMount && turnOn(initialFacingMode) },[])

    useDisablePinchZoomEffect()

    return (
        <AnimatePresence>
        <div key='container' style={container(!!picture ? previewBackground : 'black' )}>
            <canvas hidden={true} ref={canvasRef}/>
            <video
                style={{ objectFit: 'cover' }}
                ref={videoRef}
                hidden={!!picture}
                autoPlay
            />
            {
                picture &&
                <motion.div
                    animate={previewEnterAnimation}
                    exit={previewExitAnimation}
                >
                    <img src={picture} hidden={!picture}/>
                </motion.div>
            }
        </div>
        <div key='overlay' style={overlay}>
            {
                children &&
                React.Children.map(children, (child) => 
                    React.cloneElement(child, {
                        turnOn: (facingMode) => turnOn(facingMode||initialFacingMode),
                        turnOff,
                        takePicture,
                        deletePicture,
                        isOnPreview: !!picture,
                        cameraState
                    })
                )
            }
        </div>
        </AnimatePresence>
    )

}

Camera.proptypes = {
    initialFacingMode: PropTypes.string,
    startOnMount: PropTypes.bool,
    onTakePicture: PropTypes.func,
    onError: PropTypes.func,
    previewBackground: PropTypes.string,
    previewEnterAnimation: PropTypes.object,
    previewExitAnimation: PropTypes.object
}

export default Camera