import React from 'react'
import { useAnimatedLocation } from '../FlowManagerV2'
import { useMemo } from 'react'

const goLeft = {
    exit: { x: '-20%', opacity: 0 },
    enter: { x: '0%', opacity: 1 },
    initial: { x: '20%', opacity: 0 }
}

const goRight = {
    exit: { x: '20%', opacity: 0 },
    enter: { x: '0%', opacity: 1 },
    initial: { x: '-20%', opacity: 0 }
}

const BottomTabBar = ({ buttons = [] }) => {

    const [location, setLocation] = useAnimatedLocation()
    const currentIndex = useMemo(() => buttons.findIndex((button) => button.location === location),[location,buttons])

    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${buttons.length},1fr)` }}>
            {
                buttons.map((button,index) => 
                    <div
                        style={{ minWidth: '50px', height: '50px' }}
                        onClick={() => currentIndex === index ? null :
                            currentIndex > index ?
                            setLocation(goRight, button.location)
                            :
                            setLocation(goLeft, button.location)
                        }
                    >
                        <label>{button.location}</label>
                    </div>
                )
            }
        </div>
    )
}

export default BottomTabBar