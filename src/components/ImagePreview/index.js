import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { circularButtonContainer, dropzone } from './styles'
import Icon from '../Icon'
import { shadow } from '@ziro/theme'

export { useDropzone } from './useDropzone'

const _CircularButton = ({ template, onClick, isDisabled, icon }) =>
    <motion.a
        whileTap={isDisabled ? null : { scale: 0.95 }}
        onClick={isDisabled ? null : onClick}
        style={circularButtonContainer(template)}
    >
        { icon && <Icon type={icon} size={24} color={ template === 'light' ? 'black' : 'white'}/> }
    </motion.a>

const CircularButton = React.memo(_CircularButton)

const _CircularInput = ({ template, isDisabled }) =>
    <div>
        <motion.label
            style={circularButtonContainer(template)}
            htmlFor='input-file'
            whileTap={isDisabled ? null : { scale: 0.95 }}
            >
                <Icon type='upload' size={24} color={ template === 'light' ? 'black' : 'white'}/>
        </motion.label>
        <input
            disabled={isDisabled}
            style={{ opacity: 0, width: 0, height: 0 }}
            hidden={true}
            id='input-file'
            type='file'
            accept='image/*'
            multiple={false}
        />
    </div>

const CircularInput = React.memo(_CircularInput)

const ImagePreview = ({ picture, primaryIcon, primaryAction, secondaryIcon, secondaryAction, dropzoneProps={}, instructions, isDisabled = false }) => {
    const [minHeight, setMinHeight] = useState('')
    useEffect(() => {
        window ? setMinHeight(Math.min(window.innerWidth, 500)) : setMinHeight(500)
    }, []);

    return (
        <div>
            <div style={{...dropzone, minHeight}} {...dropzoneProps}>
                {
                    picture ?
                        <img style={{ maxWidth: '100%', boxShadow: shadow }} src={picture}/>
                    :
                        <label style={{ marginTop: '20px' }}>{ instructions }</label>
                }
                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridColumnGap: '20px' }}>
                    {
                        secondaryAction === 'input' ?
                            <CircularInput template='light' isDisabled={isDisabled}/>
                        :
                            <CircularButton
                                template='light'
                                isDisabled={isDisabled}
                                onClick={secondaryAction}
                                icon={secondaryIcon}
                            />
                    }
                    {
                        primaryAction === 'input' ?
                            <CircularInput template='regular' isDisabled={isDisabled}/>
                        :
                            <CircularButton
                                template='regular'
                                isDisabled={isDisabled}
                                onClick={primaryAction}
                                icon={primaryIcon}
                            />
                    }
                </div>
            </div>
        </div>
    )
}

export default ImagePreview