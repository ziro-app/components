import React from 'react'
import Header from '../../../components/Header'
import { useHeader, useFooter, usePersistentScroll, useHideOnScroll, useAnimatedLocation, useScroll, useToastModal, useHistory } from '../../../components/FlowManager'
import { BottomTabBar } from './bottomBar'
import { useEffect } from 'react'
import { useState } from 'react'
import Toast from '../../../components/ToastNotification'

export default () => {
    const history = useHistory()

    console.log({ history })

    useHeader(<Header type='title-only' title='tab3'/>,[])

    const setLocation = useAnimatedLocation()[1]
    const [scroll, setScroll] = useState(true)
    const [toastOpen, setToastOpen] = useState(false)

    usePersistentScroll()
    useHideOnScroll()

    useScroll(scroll)

    const [numbers, setNumbers] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {
            setNumbers(old => [...old, old.length])
        },500)
        return () => clearInterval(interval)
    })

    useToastModal(
        <Toast
            isOpen={toastOpen}
            setIsOpen={setToastOpen}
            boxStyle={{ position: 'fixed', width: window.innerWidth, background: 'white', height: '60px' }}
        >
            <label>Seila</label>
        </Toast>,
        [toastOpen])

    return (
        <div style={{ display: 'grid', background: 'yellow', height: '100%', width: '100%' }}>
            {numbers.map((_,index) => {

                return <label onClick={() => setToastOpen(true)}>{index}</label>
            })}
        </div>
    )
}