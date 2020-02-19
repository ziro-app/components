import React from 'react'
import Button from '../Button'
import { doubleButton, singleButton, container } from './styles'

const FlowButtonsWrapper = ({ children, next, previous }) => {
    return (
        <div style={container}>
            {children}
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