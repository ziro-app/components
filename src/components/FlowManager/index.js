import React from 'react'
import Button from '../Button'
import Header from '../Header'
import { doubleButton, singleButton, container, content } from './styles'
import { FlowDiv } from './FlowDiv.js'

export { useAnimatedLocation } from './useAnimatedLocation'

const FlowManager = ({ children, title, controls, next, previous, nextTitle = 'próximo', previousTitle = 'voltar', overflow = 'hidden', height = '85vh' }) => {

    return (
        <div style={{ ...container, overflow, height }}>
            <FlowDiv controls={controls}>
                <Header type='title-only' title={title}/>
            </FlowDiv>
            <FlowDiv
                controls={controls}
                normal={{ scale: 1, x: '0%', y: '0%', opacity: 1 }}
                next={{ x: '-150%' }}
                previous={{ x: '150%' }}
                diverge={{ scale: 0.8, opacity: 0 }}
                converge={{ y: '20%', opacity: 0 }}
                style={content}
            >
                {children}
            </FlowDiv>
            <FlowDiv controls={controls} style={next && previous ? doubleButton : singleButton}>
                    {
                        previous &&
                        <Button
                            type='click'
                            cta={previousTitle}
                            click={previous}
                        />
                    }
                    {
                        next &&
                        <Button
                            type='click'
                            cta={nextTitle}
                            click={next}
                        />
                    }
            </FlowDiv>
        </div>
    )
}

export default FlowManager