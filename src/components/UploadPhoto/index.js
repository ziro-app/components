import React from 'react'
import ImagePreview, { useDropzone } from '../ImagePreview'

const UploadPhoto = ({ picture, setPicture, onRequestCamera, isDisabled = false, instructions }) => {
    const dropzoneProps = useDropzone(isDisabled, setPicture)

    return (
        <ImagePreview
            dropzoneProps={dropzoneProps}
            picture={picture}
            primaryAction={onRequestCamera}
            primaryIcon='camera'
            secondaryIcon='upload'
            secondaryAction='input'
            instructions={instructions ? instructions : 'Tire uma foto ou escolha do dispositivo.'}
        />
    )
}

export default UploadPhoto