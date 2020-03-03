import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import FlowManager from '../FlowManager'
import UploadPhoto from '../UploadPhoto'
import Modal from '../FlowModal'
import CameraContainer from '../CameraContainer'
import { useState, useCallback } from 'react'
import { useCameraAsOverlay } from './useCameraAsOverlay'

const FlowUploadPhoto = () => {

    const [picture, setPicture] = useState()

    const [isCameraOpen, cameraControls, closeCamera, openCamera, closeAfterSend] = useCameraAsOverlay()

    const [isModalOpen, setModalOpen] = useState(true)

    const onCloseModal = useCallback(() => {
        setModalOpen(false)
        openCamera()
    },[setModalOpen, openCamera])

    const previewControls = useAnimation()

    return (
        <>
            <FlowManager
                title='Foto do documento'
                next={() => {}}
                previous={() => {}}
            >
                <UploadPhoto
                    picture={picture}
                    setPicture={setPicture}
                    onRequestCamera={openCamera}
                />
            </FlowManager>
            {
                isCameraOpen &&
                <motion.div
                    animate={cameraControls}
                    transition={{ type: 'tween' }}
                    initial={{ y: '100%' }}
                    variants={{
                        close: { y: '100%' },
                        closeAfterSend: { opacity: 0 },
                        open: { y: '0%' }
                    }}
                >
                    <CameraContainer
                        startOnMount={true}
                        initialFacingMode='rear'
                        onClose={closeCamera}
                        onSend={(pic) => {
                            setPicture(pic)
                            closeAfterSend()
                        }}
                    />
                </motion.div>
            }
            <Modal
                isOpen={isModalOpen}
                illustration='profileData'
                errorTitle='foto do documento'
                errorMessage='documento'
                onRequestClose={onCloseModal}
            />
        </>
    )
}

export default FlowUploadPhoto