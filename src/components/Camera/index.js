import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import Form from '../Form'
import FormInput from '../FormInput'
import Button from '../Button'
import { btn } from '../Button/styles'
import { container, imageContainer, buttonContainer, btnHalf, inputHalf, input } from './styles'

const Camera = ({ label = 'Foto', facingMode, sendPicture }) => {

    const [picture, setPicture] = useState(null)
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const inputRef = useRef(null)

    useLayoutEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: { facingMode } })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                }
            })
            .catch(error => console.log({ error }))
    },[picture])

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
            inputRef.current.value = ""
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
        <div style={container}>
            <Form
                buttonOnTop={true}
                validations={[]}
                sendToBackend={() => sendPicture(picture)}
                inputs={[
                    <FormInput
                    name="photo"
                    label={label}
                    input={
                        <>
                            {
                                picture ?
                                <img
                                    style={imageContainer}
                                    src={picture}
                                />
                                :
                                <video
                                    style={imageContainer}
                                    ref={videoRef}
                                    autoPlay
                                />
                            }
                            <canvas style={{ width: 0, height: 0 }} ref={canvasRef}/>
                            <div style={buttonContainer}>
                                <Button
                                    type="click"
                                    cta={picture ? "Excluir" : "Tirar Foto"}
                                    click={handleClick}
                                    style={{ ...btn, ...btnHalf }}
                                />
                                <div style={{ ...btn, ...inputHalf }}>
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
                                </div>
                            </div>
                        </>
                    }
                  />,
                ]}
            />
        </div>
        )
}

Camera.propTypes = {
    label: PropTypes.string,
    facingMode: PropTypes.string,
    sendPicture: PropTypes.func
}

export default Camera