import React, { useRef, useCallback, useEffect, useState } from 'react'

export const useCamera = (onTakePicture, onError) => {

    const [picture, setPicture] = useState(null)
    const [cameraState, setCameraState] = useState('off')

    const videoRef = useRef(null)
    const canvasRef = useRef(null)

    const turnOn = useCallback((facingMode) => {
        return navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: facingMode == 'front' ? 'user' : { ideal:  'environment' } } 
        }).then((stream) => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                setCameraState(facingMode||'on')
            }
        }).catch((error) => onError && onError(error))
    },[])

    const turnOff = useCallback(() => {
        if(videoRef.current) {
            videoRef.current.srcObject = null
            setCameraState('off')
        }
    },[])

    const takePicture = useCallback(() => {
        if(!picture && canvasRef.current && videoRef.current) {
            const { videoHeight, videoWidth, parentElement:{ clientHeight, clientWidth } } = videoRef.current

            const sx = videoWidth > clientWidth ? (videoWidth-clientWidth)/2 : 0
            const sy = videoHeight > clientHeight ? (videoHeight-clientHeight)/2 : 0
            const width = Math.min(videoWidth,clientWidth)
            const height = Math.min(videoHeight,clientHeight)

            canvasRef.current.width = width
            canvasRef.current.height = height

            const context = canvasRef.current.getContext('2d')
            context.drawImage(videoRef.current,sx,sy,width,height,0,0,width,height)
            const dataImg = canvasRef.current.toDataURL('image/png')
            setPicture(dataImg)
            onTakePicture && onTakePicture(dataImg)
        }
    },[picture,onTakePicture])

    const deletePicture = useCallback(() => setPicture(null))

    return [picture, videoRef, canvasRef, turnOn, turnOff, takePicture, deletePicture, cameraState]
    
}

export const useDisablePinchZoomEffect = () => {
    useEffect(() => {
      const disablePinchZoom = (e) => e.touches.length && e.preventDefault()
      document.addEventListener("touchmove", disablePinchZoom, { passive: false })
      return () => document.removeEventListener("touchmove", disablePinchZoom)
    }, [])
  }