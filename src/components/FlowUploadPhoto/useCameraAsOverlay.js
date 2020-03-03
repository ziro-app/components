import React, { useState, useCallback, useEffect } from 'react'
import { useAnimation } from 'framer-motion'

export const useCameraAsOverlay = () => {
    const [isCameraOpen, setCameraOpen] = useState(false)
    const cameraControls = useAnimation()

    const closeCamera = useCallback(async () => {
        await cameraControls.start('close')
        setCameraOpen(false)
    },[cameraControls, setCameraOpen])

    const openCamera = useCallback(() => setCameraOpen(true),[setCameraOpen])

    const closeAfterSend = useCallback(async () => {
        await cameraControls.start('closeAfterSend')
        setCameraOpen(false)
    },[cameraControls, setCameraOpen])

    useEffect(() => {
        isCameraOpen && cameraControls.start('open')
    },[isCameraOpen, cameraControls])

    return [isCameraOpen, cameraControls, closeCamera, openCamera, closeAfterSend]
}