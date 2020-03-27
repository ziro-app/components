import React from 'react'
import Icon from '../../../components/Icon'
import BottomBar from '../../../components/BottomTabBar'

export const BottomTabBar = () => {
    return (
        <BottomBar
            buttons={[
                {
                    location: '/tab-flow/1',
                    icon: (isSelected) => <Icon type='home' size={24} strokeWidth={1} fill={isSelected}/>
                },
                {
                    location: '/tab-flow/2',
                    icon: (isSelected) => <Icon type='search' size={24} strokeWidth={isSelected?2:1}/>
                },
                {
                    location: '/tab-flow/3',
                    icon: (isSelected) => <Icon type='star' size={24} strokeWidth={1} fill={isSelected}/>,
                    notificationNumber: 3
                },
                {
                    location: '/tab-flow/4',
                    icon: (isSelected) => <Icon type='user' size={24} strokeWidth={1} fill={isSelected}/>
                }
            ]}
        />
    )
}