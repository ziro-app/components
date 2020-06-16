import React, { useRef, useCallback, useEffect, useState } from 'react'

export const useCamera = (onTakePicture, onError, startOnMount, initialFacingMode) => {

    const [picture, setPicture] = useState(null)
    const [cameraState, setCameraState] = useState('off')
    const [track, setTrack] = useState(null)

    const videoRef = useRef(null)
    const canvasRef = useRef(null)

    const turnOn = useCallback((facingMode) => {
        if(track) {
            track.stop()
            setTrack(null)
        }
        navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: facingMode == 'front' ? 'user' : { ideal:  'environment' } } 
        }).then((stream) => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                setCameraState(facingMode||'on')
                setTrack(stream.getTracks()[0])
            }
        }).catch((error) => onError && onError(error))
    },[onError, track])

    const turnOff = useCallback(() => {
        if(videoRef.current) {
            videoRef.current.srcObject = null
            setCameraState('off')
            if(track) {
                track.stop()
                setTrack(null)
            }
        }
    },[track])

    const takePicture = useCallback(() => {
        if(!picture && canvasRef.current && videoRef.current) {
            let { videoHeight, videoWidth, parentElement:{ clientHeight, clientWidth } } = videoRef.current

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

    useEffect(() => {
        startOnMount && turnOn(initialFacingMode)
        return () => {
            const stream = videoRef.current && videoRef.current.srcObject
            stream && stream.getTracks()[0].stop()
        }
    },[])

    return [picture, videoRef, canvasRef, turnOn, turnOff, takePicture, deletePicture, cameraState]
    
}

export const useDisablePinchZoomEffect = (shouldDisable) => {
    useEffect(() => {
        if(!shouldDisable) return
      const disablePinchZoom = (e) => e.touches.length && e.preventDefault()
      document.addEventListener("touchmove", disablePinchZoom, { passive: false })
      return () => document.removeEventListener("touchmove", disablePinchZoom)
    }, [shouldDisable])
  }