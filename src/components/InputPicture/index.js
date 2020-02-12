import React, { useRef, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import { motion } from 'framer-motion'
import { imageContainer, buttonContainer, btn, inputBtn, input } from './styles'

const InputPicture = ({ facingMode, picture, setPicture, onErrorMsg, allowUpload }) => {

    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: facingMode == 'front' ? 'user' : { ideal:  'environment' } } })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                }
            })
            .catch(error => onErrorMsg(error))
    },[])

    const handleClick = useCallback(() => {
        if(!picture && canvasRef.current && videoRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth
            canvasRef.current.height = videoRef.current.videoHeight
            const context = canvasRef.current.getContext('2d')
            context.drawImage(videoRef.current,0,0)
            const dataImg = canvasRef.current.toDataURL('image/png')
            setPicture(dataImg)
        }
        else {
            setPicture(null)
            if(inputRef.current) inputRef.current.value = ""
        }
    },[picture])

    const fileHandler = useCallback((event) => {
        if(event.target.files.length) {
            const reader = new FileReader()
            reader.onload = (e) => setPicture(e.target.result)
            reader.readAsDataURL(event.target.files[0])
        }
    })

    return (
        <>
            <img
                style={imageContainer}
                src={picture}
                hidden={!picture}
            />
            <video
                style={imageContainer}
                ref={videoRef}
                hidden={!!picture}
                autoPlay
            />
            <canvas hidden={true} ref={canvasRef}/>
            <div style={buttonContainer}>
                <Button
                    type="formClick"
                    cta={picture ? "Excluir" : "Tirar Foto"}
                    click={handleClick}
                    style={btn(allowUpload,picture)}
                />
                {
                    allowUpload ?

                        <motion.a
                            style={inputBtn}
                            whileTap={{ scale: 0.95 }}
                        >
                            <label htmlFor="file_upload" style={input}>Upload</label>
                            <input
                                ref={inputRef}
                                name="file_upload"
                                id="file_upload"
                                type="file"
                                accept="image/*"
                                multiple={false}
                                style={{ opacity: 0, width: 0, height: 0 }}
                                onChange={fileHandler}
                            />
                        </motion.a>

                    : null
                }
                
            </div>
        </>
    )
}

InputPicture.propTypes = {
    picture: PropTypes.string,
    setPicture: PropTypes.func.isRequired,
    facingMode: PropTypes.string,
    onErrorMsg: PropTypes.func,
    allowUpload: PropTypes.bool,
}

export default InputPicture