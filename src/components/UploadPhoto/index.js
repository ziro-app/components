import React from 'react'
import { motion } from 'framer-motion'

import { useDropzone } from './useDropzone'

import { dropzone, styleTag, instructions } from '../ImageUpload/styles'
import Icon from '../Icon'
import { gradient, shadow } from '@ziro/theme'

const UploadPhoto = ({ picture, setPicture, onRequestCamera, isDisabled = false }) => {

    const dropzoneProps = useDropzone(isDisabled, setPicture)

    return (
        <div>
            <div
                style={{
                    display: 'grid',
                    alignContent: 'center',
                    justifyItems: 'center',
                    gridRowGap: '15px',
                    border: `2px dashed grey`,
                    borderRadius: '6px',
                    color: 'black',
                    textAlign: 'center',
                    minHeight: '50vh',
                    overflow: 'hidden',
                    padding: '20px'
                }}
                className='dropzone'
                {...dropzoneProps}
            >
                <style>{styleTag}</style>
                {
                    picture ?
                        <img style={{ maxWidth: '100%', boxShadow: shadow }} src={picture}/>
                    :
                        <label style={ instructions }>Tire uma foto ou escolha do dispositivo</label>
                }
                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridColumnGap: '20px' }}>
                    <motion.a
                        whileTap={isDisabled ? null : { scale: 0.95 }}
                        onClick={onRequestCamera}
                        style={{ display: 'grid', width: '50px', height: '50px', borderRadius: '50%', background: gradient, alignItems: 'center', justifyContent: 'center', boxShadow: shadow }}
                    >
                        <Icon type='camera' size={24} color='white'/>
                    </motion.a>
                    <div>
                        <motion.label
                            style={{ display: 'grid', width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(rgb(240, 240, 240) 10%, rgb(245, 245, 245) 30%, rgb(250, 250, 250) 60%, rgb(255, 255, 255))', alignItems: 'center', justifyContent: 'center', boxShadow: shadow }}
                            htmlFor='input-file'
                            whileTap={isDisabled ? null : { scale: 0.95 }}
                            >
                                <Icon type='upload' size={24} color='black'/>
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
                </div>
            </div>
        </div>
    )
}

export default UploadPhoto