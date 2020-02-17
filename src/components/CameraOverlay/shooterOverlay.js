import React, { useCallback, useState } from 'react'
import Proptypes from 'prop-types'
import { motion } from 'framer-motion'
import { shooterDownContainer, shooterUpContainer, shooterTogglesContainer } from './styles'
import CameraButton from '../CameraButton'
import { useShooter } from './useShooter'

const ShooterOverlay = ({ takePicture, cameraState, turnOn, turnOff, onClose, allowSwap }) => {

    const [onOff, frontRear, toggleOnOff, toggleFrontRear] = useShooter(cameraState, turnOn, turnOff)

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
            <div style={shooterTogglesContainer}>
                {
                    allowSwap ?
                    <CameraButton
                        type='toggle'
                        click={toggleFrontRear}
                    />
                    :
                    <div/>
                }
                <CameraButton
                    type='video'
                    toggle={onOff}
                    click={toggleOnOff}
                />
            </div>
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
                disabled={cameraState=='off'}
            />
        </motion.div>
        </>
    )
}

ShooterOverlay.proptypes = {
    takePicture: Proptypes.func.isRequired
}

export default ShooterOverlay