import React, { useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAnimatedLocation } from '../FlowManager'
import { gridTransition, elementTransition } from './transitions'
import { container, button, iconContainer, titleContainer, titleFont } from './styles'

const BottomTabBar = ({ buttons = [], options = {} }) => {

    const [currentLocation, setLocation] = useAnimatedLocation()
    const [currentIndex, gridTemplateColumns] = useMemo(() => ([
        buttons.findIndex(({ location }) => currentLocation.startsWith(location)),
        buttons.map(({ location }) => currentLocation.startsWith(location) ? '1.5fr' : '1fr').join(' ')
    ])
    ,[currentLocation,buttons])

    return (
        <motion.div
            initial={false}
            animate={{ gridTemplateColumns }}
            style={container}
            transition={gridTransition}
        >
            {
                buttons.map(({ title, icon, location },index) => {
                    
                    const isSelected = useMemo(() => currentIndex === index, [currentIndex])
                    const animation = useMemo(() => currentIndex > index ? 'goRight' : 'goLeft', [currentIndex])
                    const onClick = useCallback(() => isSelected ? null : setLocation(animation, location),[currentIndex])

                    return (
                        <motion.div
                            animate={{ gridTemplateRows: isSelected || options.keepText ? '1fr 1fr' : '10fr 1fr' }}
                            transition={elementTransition}
                            style={button}
                            onClick={onClick}
                        >
                            <motion.div
                                animate={{ scale: isSelected ? 1 : 0.8 }}
                                transition={elementTransition}
                                style={iconContainer}
                            >
                                {icon}
                            </motion.div>
                            <motion.div
                                animate={options.keepText ?
                                    { scale: isSelected ? 1 : 0.8 }
                                    :
                                    { scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }
                                }
                                transition={elementTransition}
                                style={titleContainer}
                            >
                                <label style={{ ...titleFont, color: isSelected ? 'black' : 'grey' }}>{title}</label>
                            </motion.div>
                        </motion.div>
                    )
                })
            }
        </motion.div>
    )
}

export default BottomTabBar