import React, { useState, useEffect, useCallback } from 'react'

export const useShooter = (cameraState, turnOn, turnOff) => {

    const [onOff, setOnOff] = useState(cameraState == 'off' ? 'on' : 'off')
    const [frontRear, setFrontRear] = useState(cameraState == 'front' ? 'rear' : 'front')

    useEffect(() => {
        setOnOff(cameraState == 'off' ? 'on' : 'off')
        setFrontRear(cameraState == 'front' ? 'rear' : 'front')
    },[cameraState])

    const toggleOnOff = useCallback(() => cameraState == 'off' ? turnOn() : turnOff(),[cameraState,turnOn,turnOff])
    const toggleFrontRear = useCallback(() => cameraState == 'front' ? turnOn('rear') : turnOn('front'),[cameraState, turnOn, turnOff])

    return [onOff, frontRear, toggleOnOff, toggleFrontRear]

}