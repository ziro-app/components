import React, { useMemo, useCallback } from 'react'
import { useAnimatedLocation } from '../FlowManager'
import { container, button } from './styles'

const BottomTabBar = ({ buttons = [] }) => {

    const [currentLocation, setLocation] = useAnimatedLocation()
    const [currentIndex, gridTemplateColumns] = useMemo(() => ([
        buttons.findIndex(({ location }) => currentLocation.startsWith(location)),
        buttons.map(() => '1fr').join(' ')
    ])
    ,[currentLocation,buttons])

    return (
        <div style={{ ...container, gridTemplateColumns }}>
            {
                buttons.map(({ icon, location },index) => {
                    
                    const isSelected = useMemo(() => currentIndex === index, [currentIndex])
                    const animation = useMemo(() => currentIndex > index ? 'goRight' : 'goLeft', [currentIndex])
                    const onClick = useCallback(() => isSelected ? null : setLocation(animation, location),[currentIndex])

                    return (
                        <div style={button} onClick={onClick}>
                                {icon(isSelected)}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BottomTabBar