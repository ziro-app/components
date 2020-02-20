import React from 'react'
import Button from '../Button'
import Header from '../Header'
import { doubleButton, singleButton, container, content } from './styles'

const FlowButtonsWrapper = ({ children, title, next, previous }) => {
    return (
        <div style={container}>
            <Header type='title-only' title={title}/>
            <div style={content}>
                {children}
            </div>
            <div style={next && previous ? doubleButton : singleButton}>
                {
                    previous &&
                    <Button
                        type='click'
                        cta={previous.title}
                        click={previous.onClick}
                    />
                }
                {
                    next &&
                    <Button
                        type='click'
                        cta={next.title}
                        click={next.onClick}
                    />
                }
            </div>
        </div>
    )
}

export default FlowButtonsWrapper