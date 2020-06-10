import React from 'react'
import { motion } from 'framer-motion'
import { useAnimatedLocation, useHeader, useFooter, useModal, useMessageModal, useScroll } from '../FlowManager'
import UploadPhoto from '../UploadPhoto'
import Header from '../HeaderFlow'
import BottomFlowButtons from '../BottomFlowButtons'
import CameraContainer from '../CameraContainer'
import { useState, useCallback } from 'react'
import { useCameraAsOverlay } from './useCameraAsOverlay'
import { useEffect } from 'react'
import { errors } from './errors'

const FlowUploadPhoto = ({ next, previous, title, modal, log, maxWidth }) => {

    const [picture, setPicture] = useState()

    const [isCameraOpen, cameraControls, closeCamera, openCamera, closeAfterSend] = useCameraAsOverlay()

    const setMessage = useMessageModal(errors(modal,() => {
        if(log) console.log('opening camera', { openCamera })
        openCamera()
    }))

    useScroll(!isCameraOpen)

    const setLocation = useAnimatedLocation()[1]

    useEffect(() => {
        setPicture()
        setMessage('START')
        cameraControls.set('close')
    },[title])

    const _onPrevious = useCallback(async () => {
        try {
            previous.onClick && await previous.onClick({ picture })
            previous.location && setLocation('goRight', previous.location)
        }
        catch(error) {
            setMessage(error)
        }
    },[picture, previous])

    const _onNext = useCallback(async () => {
        try {
            next.onClick && await next.onClick({ picture })
            next.location && setLocation('goLeft', next.location)
        }
        catch(error) {
            setMessage(error)
        }
    },[picture, next])

    useFooter(<BottomFlowButtons previous={_onPrevious} next={_onNext} />,[_onPrevious, _onNext])

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
                        initialFacingMode='rear'
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