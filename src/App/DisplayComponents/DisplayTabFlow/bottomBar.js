import React from 'react'
import BottomBar from '../../../components/BottomTabBar'

export const BottomTabBar = () => {
    return (
        <BottomBar
            buttons={[
                {
                    location: '/tab-flow/1',
                    title: 'Tab1',
                    icon: 'success'
                },
                {
                    location: '/tab-flow/2',
                    title: 'Tab2',
                    icon: 'lock'
                },
                {
                    location: '/tab-flow/3',
                    title: 'Tab3',
                    icon: 'user'
                }
            ]}
            options={{
                keepText: false
            }}
        />
    )
}