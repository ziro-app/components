import React, { useCallback, useState } from 'react'
import Proptypes from 'prop-types'
import { motion } from 'framer-motion'
import { shooterDownContainer, shooterUpContainer } from './styles'
import CameraButton from '../CameraButton'

const ShooterOverlay = ({ takePicture, cameraState, turnOn, turnOff, onClose, allowSwap }) => {

    const [toggleIcon, setToggleIcon] = useState(cameraState == 'off' ? 'on' : 'off')

    const toggle = useCallback(() => {
        if (allowSwap) {
            switch(cameraState) {
                case 'off':
                    turnOn('rear')
                    setToggleIcon('front')
                    return
                case 'front':
                    turnOff()
                    setToggleIcon('on')
                    return
                default:
                    turnOn('front')
                    setToggleIcon('off')
                    return
            }
        }
        else {
            cameraState == 'off' ? turnOn() : turnOff()
            setToggleIcon(cameraState == 'off' ? 'on' : 'off')
        }
    },[cameraState, allowSwap])

    return (
        <>
        <motion.div
            key='shooterUp'
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ type: 'tween' }}
            style={shooterUpContainer}>
            <CameraButton
                type='close'
                click={onClose}
            />
            <CameraButton
                type='video'
                toggle={toggleIcon}
                click={toggle}
            />
        </motion.div>
        <motion.div
            key='shooterDown'
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ type: 'tween' }}
            style={shooterDownContainer}>
            <CameraButton
                type='shooter'
                size={60}
                click={takePicture}
            />
        </motion.div>
        </>
    )
}

ShooterOverlay.proptypes = {
    takePicture: Proptypes.func.isRequired
}

export default ShooterOverlay