import React from 'react'
import { motion } from 'framer-motion'
import { useFooter, useModal, useMessageModal, useScroll } from '../FlowManager'
import UploadPhoto from '../UploadPhoto'
import BottomFlowButtons from '../BottomFlowButtons'
import CameraContainer from '../CameraContainer'
import { useState } from 'react'
import { useCameraAsOverlay } from './useCameraAsOverlay'
import { useCallback } from 'react'
import { useEffect } from 'react'

const FlowUploadPhoto = ({ next, previous, maxWidth, initialFacingMode, allowSwap, submitting, isCameraOpen }) => {

    const [picture, setPicture] = useState()
    const [_isCameraOpen, cameraControls, closeCamera, openCamera, closeAfterSend] = useCameraAsOverlay()
    const _next = useCallback(() => next({ picture }),[picture,next])

    useScroll(!isCameraOpen)

    useEffect(() => { isCameraOpen ? openCamera() : closeCamera() },[isCameraOpen])

    useFooter(<BottomFlowButtons previous={previous} next={_next} submitting={submitting} />,[previous, _next, submitting])

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
                    _isCameraOpen &&
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

    return (
        <UploadPhoto
            picture={picture}
            setPicture={setPicture}
            onRequestCamera={openCamera}
        />
    )
}

export default FlowUploadPhoto