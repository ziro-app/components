import React from 'react'
import { motion } from 'framer-motion'
import { useFooter, useModal, useMessageModal, useScroll } from '../FlowManager'
import UploadPhoto from '../UploadPhoto'
import BottomFlowButtons from '../BottomFlowButtons'
import CameraContainer from '../CameraContainer'
import { useState } from 'react'
import { useCameraAsOverlay } from './useCameraAsOverlay'
import { useEffect } from 'react'
import { errors } from './errors'

const FlowUploadPhoto = ({ next, previous, title, modais, log, maxWidth, initialFacingMode, allowSwap, submitting }) => {

    const [picture, setPicture] = useState()

    const [isCameraOpen, cameraControls, closeCamera, openCamera, closeAfterSend] = useCameraAsOverlay()

    const [_message, _setMessage] = useState()

    const setMessage = useMessageModal(errors(
        modais,
        () => {
            if(log) console.log('opening camera', { openCamera })
            openCamera()
        },
        _setMessage,
    ))

    useEffect(() => setMessage(_message),[_message])

    if(log) console.log(_message)

    useScroll(!isCameraOpen)

    useEffect(() => {
        setPicture()
        setMessage('0')
        cameraControls.set('close')
    },[title])

    useFooter(<BottomFlowButtons previous={previous} next={() => next({ picture })} submitting={submitting} />,[previous, next, picture,submitting])

    useModal(
            <motion.div
                animate={cameraControls}
                transition={{ type: 'tween' }}
                initial={{ y: '100%' }}
                variants={{
                    close: { y: '100%', opacity: 1 },
                    closeAfterSend: { opacity: 0 },
                    open: { y: '0%' }
                }}
                style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth, margin: 'auto' }}
            >
                {
                    isCameraOpen &&
                    <CameraContainer
                        startOnMount={true}
                        initialFacingMode={initialFacingMode}
                        allowSwap={allowSwap}
                        onClose={closeCamera}
                        onSend={(pic) => {
                            setPicture(pic)
                            closeAfterSend()
                        }}
                    />
                }
            </motion.div>
    ,[isCameraOpen])

    if(log) console.log({ isCameraOpen, useModal, cameraControls: cameraControls.valueOf() })

    return (
        <UploadPhoto
            picture={picture}
            setPicture={setPicture}
            onRequestCamera={openCamera}
        />
    )
}

export default FlowUploadPhoto