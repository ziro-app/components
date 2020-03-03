import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import FlowManager, { useAnimatedLocation } from '../FlowManager'
import UploadPhoto from '../UploadPhoto'
import Modal from '../FlowModal'
import CameraContainer from '../CameraContainer'
import { useState, useCallback, useRef } from 'react'
import { useCameraAsOverlay } from './useCameraAsOverlay'
import { shadow } from '@ziro/theme'

const FlowUploadPhoto = ({ next, previous }) => {

    const [picture, setPicture] = useState()

    const [isCameraOpen, cameraControls, closeCamera, openCamera, closeAfterSend] = useCameraAsOverlay()

    const [isModalOpen, setModalOpen] = useState(false)

    const onCloseModal = useCallback(() => {
        setModalOpen(false)
        openCamera()
    },[setModalOpen, openCamera])

    const picRef = useRef(null)

    const { onPrevious, controls } = useAnimatedLocation(undefined, () => setModalOpen(true))

    const _onPrevious = useCallback(() => {
        const previousOnClick = async () => {
            previous.onClick && await previous.onClick()
        }
        onPrevious(previousOnClick, previous.location)
    },[previous.onClick, previous.location, onPrevious])

    return (
        <>
            <FlowManager
                controls={controls}
                title='Foto do documento'
                next={() => {}}
                previous={_onPrevious}
                hookDeps={[picture]}
            >
                <UploadPhoto
                    ref={picRef}
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
                        closeAfterSend: { opacity: 0, y: '20%' },
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