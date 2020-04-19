import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useAnimatedLocation, useHeader, useFooter, useModal } from '../FlowManager'
import UploadPhoto from '../UploadPhoto'
import Modal from '../FlowModal'
import Header from '../HeaderFlow'
import BottomFlowButtons from '../BottomFlowButtons'
import CameraContainer from '../CameraContainer'
import { useState, useCallback, useRef } from 'react'
import { useCameraAsOverlay } from './useCameraAsOverlay'
import { shadow } from '@ziro/theme'
import { useEffect } from 'react'
import * as Errors from './errors'

const FlowUploadPhoto = ({ next, previous, title, modal }) => {

    const [picture, setPicture] = useState()

    const [isCameraOpen, cameraControls, closeCamera, openCamera, closeAfterSend] = useCameraAsOverlay()

    const [isModalOpen, setModalOpen] = useState(true)

    const [error, setError] = useState()

    const setLocation = useAnimatedLocation()[1]

    useEffect(() => {
        setPicture()
        setModalOpen(true)
    },[title])

    const onCloseModal = useCallback(() => {
        setModalOpen(false)
        openCamera()
    },[setModalOpen, openCamera])

    const _onPrevious = useCallback(async () => {
        try {
            previous.onClick && await previous.onClick({ picture })
            previous.location && setLocation('goRight', previous.location)
        }
        catch(error) {
            setError(error)
        }
    },[picture, previous])

    const _onNext = useCallback(async () => {
        try {
            next.onClick && await next.onClick({ picture })
            next.location && setLocation('goLeft', next.location)
        }
        catch(error) {
            setError(error)
        }
    },[picture, next])

    useHeader(<Header title={title} />,[title])

    useFooter(<BottomFlowButtons previous={_onPrevious} next={_onNext} />,[_onPrevious, _onNext])

    useModal(
        <>
            <motion.div
                animate={cameraControls}
                transition={{ type: 'tween' }}
                initial={{ y: '100%' }}
                variants={{
                    close: { y: '100%', opacity: 1 },
                    closeAfterSend: { opacity: 0 },
                    open: { y: '0%' }
                }}
                style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}
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
            <Modal
                isOpen={isModalOpen || error}
                illustration={error ? undefined : modal.illustration}
                errorTitle={error ? Errors[error].title : modal.title}
                errorMessage={error ? Errors[error].message : modal.message}
                onRequestClose={ () => error ? setError() : onCloseModal()}
            />
        </>
    ,[isCameraOpen, isModalOpen, error])

    return (
        <UploadPhoto
            picture={picture}
            setPicture={setPicture}
            onRequestCamera={openCamera}
        />
    )
}

export default FlowUploadPhoto