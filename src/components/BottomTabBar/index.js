import React, { useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import Icon from '../Icon'
import { useAnimatedLocation } from '../FlowManager'
import { gridTransition, elementTransition } from './transitions'
import { container, button, iconContainer, titleContainer, titleFont } from './styles'

const BottomTabBar = ({ buttons = [] }) => {

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
                            animate={{ gridTemplateRows: isSelected ? '1fr 1fr' : '10fr 1fr' }}
                            transition={elementTransition}
                            style={button}
                            onClick={onClick}
                        >
                            <motion.div
                                animate={{ scale: isSelected ? 1 : 0.8 }}
                                transition={elementTransition}
                                style={iconContainer}
                            >
                                {
                                    icon &&
                                    <Icon type={icon} size={20} color={isSelected ? 'black' : 'grey'} strokeWidth={1}/>
                                }
                            </motion.div>
                            <motion.div
                                animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
                                transition={elementTransition}
                                style={titleContainer}
                            >
                                <label style={titleFont}>{title}</label>
                            </motion.div>
                        </motion.div>
                    )
                })
            }
        </motion.div>
    )
}

export default BottomTabBar