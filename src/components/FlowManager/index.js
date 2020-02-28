import React from 'react'
import Button from '../Button'
import Header from '../Header'
import { doubleButton, singleButton, container, content, scrollShadowTop, scrollShadowBottom } from './styles'
import { FlowDiv } from './FlowDiv.js'
import { useFlowContent } from './useFlowContent'

export { useAnimatedLocation } from './useAnimatedLocation'

const FlowManager = ({ children, title, controls, next, previous, nextTitle = 'próximo', previousTitle = 'voltar', contentOverflow }) => {

    const [contentScroll, scrollMaxInset, scrollInsetBottom, scrollInsetTop] = useFlowContent()

    console.log({ scrollMaxInset, scrollInsetBottom, scrollInsetTop })

    return (
        <div style={{ ...container }}>
            <FlowDiv controls={controls}>
                <Header type='title-only' title={title}/>
            </FlowDiv>
            <div style={{ position: 'relative', display: 'grid', overflow: contentOverflow||'hidden', gridTemplate: 'auto' }}>
                <FlowDiv controls={controls}>
                    <div style={scrollShadowTop(scrollInsetTop, scrollMaxInset)}/>
                </FlowDiv>
                <FlowDiv
                    controls={controls}
                    normal={{ scale: 1, x: '0%', y: '0%', opacity: 1 }}
                    next={{ x: '-150%' }}
                    previous={{ x: '150%' }}
                    diverge={{ scale: 0.8, opacity: 0 }}
                    converge={{ y: '20%', opacity: 0 }}
                    style={{ ...content, overflowY: contentOverflow||'auto' }}
                    contentScroll={contentScroll}
                >
                    {children}
                </FlowDiv>
                <FlowDiv controls={controls}>
                    <div style={scrollShadowBottom(scrollInsetBottom, scrollMaxInset)}/>
                </FlowDiv>
            </div>
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