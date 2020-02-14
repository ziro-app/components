import React from 'react'
import Proptypes from 'prop-types'
import { motion } from 'framer-motion'
import { shooterDownContainer, shooterUpContainer } from './styles'
import CameraButton from '../CameraButton'

const ShooterOverlay = ({ takePicture, cameraState, turnOn, turnOff }) => {
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
            />
            <CameraButton
                type='video'
                toggle={cameraState == 'off' ? 'on':'off'}
                click={() => cameraState == 'off' ? turnOn() : turnOff()}
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