import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import Modal from '../FlowModal'
import CameraContainer from '../CameraContainer'
import { useState } from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'

const UploadPhoto = () => {

    const [isCameraOpen, setCameraOpen] = useState(false)
    const cameraControls = useAnimation()

    const closeCamera = useCallback(async () => {
        await cameraControls.start('close')
        setCameraOpen(false)
    },[cameraControls, setCameraOpen])

    useEffect(() => {
        isCameraOpen && cameraControls.start('open')
    },[isCameraOpen, cameraControls])

    const [isModalOpen, setModalOpen] = useState(true)

    const onCloseModal = useCallback(() => {
        setModalOpen(false)
        setCameraOpen(true)
    },[setModalOpen, setCameraOpen])

    return (
        <>
            {
                isCameraOpen &&
                <motion.div
                    animate={cameraControls}
                    transition={{ type: 'tween' }}
                    initial={{ y: '100%' }}
                    variants={{
                        close: { y: '100%' },
                        open: { y: '0%' }
                    }}
                >
                    <CameraContainer
                        startOnMount={true}
                        initialFacingMode='rear'
                        onClose={closeCamera}
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

export default UploadPhoto