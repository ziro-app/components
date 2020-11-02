import React from 'react'
import { motion } from 'framer-motion'
import { circularButtonContainer, rectangularButtonContainer, dropzone } from './styles'
import Icon from '../Icon'
import { shadow } from '@ziro/theme'
import Button from '@bit/vitorbarbosa19.ziro.button'
import { supportPhoneNumber } from '../utils/supportNumber'

export { useDropzone } from './useDropzone'

const _CircularButton = ({ template, onClick, isDisabled, icon }) =>
    <div>
        <motion.a
            whileTap={isDisabled ? null : { scale: 0.95 }}
            onClick={isDisabled ? null : onClick}
            style={ icon === 'camera'
                ? rectangularButtonContainer(template)
                : circularButtonContainer(template)
            }
        >
            { icon && <Icon type={icon} size={24} color={ template === 'light' ? 'black' : 'white'}/> }
            {icon === 'camera' && <label>Abrir câmera</label>}
        </motion.a>
        
    </div>

const CircularButton = React.memo(_CircularButton)

const _CircularInput = ({ template, isDisabled }) =>
    <div>
        <motion.label
            htmlFor='input-file'
            whileTap={isDisabled ? null : { scale: 0.95 }}
            style={rectangularButtonContainer(template)}
            >
                <Icon type='upload' size={24} color={ template === 'light' ? 'black' : 'white'}/>
                Abrir galeria
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

    return (
        <div>
            <div style={dropzone} {...dropzoneProps}>
                {
                    picture ?
                        <img style={{ maxWidth: '100%', boxShadow: shadow }} src={picture}/>
                    :
                        <label style={{ marginTop: '20px' }}>{ instructions }</label>
                }
                <div 
                    style={
                        primaryIcon === 'camera'
                        ? { display: 'grid', gridRowGap: '15px' }
                        : { display: 'grid', gridTemplateColumns: 'auto auto', gridColumnGap: '20px' }
                    }
                >
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

                {primaryIcon === 'camera' && (
                    <Button
                        type="link"
                        cta="Problemas? Fale com o suporte!"
                        style={{
                        marginTop: '20px',
                        fontFamily: 'Rubik',
                        fontSize: '1.5rem',
                        color: '#222222',
                        textAlign: 'center',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                        }}
                        navigate={() =>
                        window.open(`https://api.whatsapp.com/send?phone=${supportPhoneNumber.replace(/\+|\s|\(|\)|-/g, "")}`, "_blank")}
                    />
                )}
            </div>
        </div>
    )
}

export default ImagePreview