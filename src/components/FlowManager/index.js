import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import Header from '../Header'
import { FlowDiv } from './FlowDiv.js'
import { useFlowContent } from './useFlowContent'
import { contentTransitions as _contentTransitions, flowElementsTransitions as _flowElementsTransitions } from './defaultTransitions'
import { doubleButton, singleButton, container, content, contentContainer, scrollShadowTop, scrollShadowBottom } from './styles'

export { useAnimatedLocation } from './useAnimatedLocation'

const FlowManager = ({
    children,
    title,
    controls,
    next,
    previous,
    nextTitle = 'próximo',
    previousTitle = 'voltar',
    header,
    topView,
    contentTransitions = _contentTransitions,
    flowElementsTransitions = _flowElementsTransitions,
}) => {

    const [contentScroll, scrollMaxInset, scrollInsetBottom, scrollInsetTop, overflowY, overflowX] = useFlowContent()

    return (
        <div style={ container }>
            <FlowDiv {...flowElementsTransitions} controls={controls}>
                { header || <Header type='title-only' title={title}/> }
            </FlowDiv>
            <FlowDiv {...contentTransitions} controls={controls}>
                {topView}
            </FlowDiv>
            <FlowDiv
                {...contentTransitions}
                controls={controls}
                style={{ ...contentContainer, overflowY, overflowX }}
            >
                <div style={scrollShadowTop(scrollInsetTop, scrollMaxInset)}/>
                <div
                    ref={contentScroll.ref}
                    style={{ ...content, overflowY, overflowX }}
                    onScroll={contentScroll.onScroll}
                >
                    {children}
                </div>
                <div style={scrollShadowBottom(scrollInsetBottom, scrollMaxInset)}/>
            </FlowDiv>
            <FlowDiv {...flowElementsTransitions} controls={controls} style={next && previous ? doubleButton : singleButton}>
                    {
                        previous &&
                        <Button
                            type='button'
                            cta={previousTitle}
                            click={previous}
                            template='light'
                        />
                    }
                    {
                        next &&
                        <Button
                            type='button'
                            cta={nextTitle}
                            click={next}
                        />
                    }
            </FlowDiv>
        </div>
    )
}

const Transitions = PropTypes.shape({
    normal: PropTypes.object,
    next: PropTypes.object,
    previous: PropTypes.object,
    diverge: PropTypes.object,
    converge: PropTypes.object
})

FlowManager.propTypes = {
    title: PropTypes.string,
    controls: PropTypes.object,
    next: PropTypes.func,
    previous: PropTypes.func,
    nextTitle: PropTypes.string,
    previousTitle: PropTypes.string,
    header: PropTypes.element,
    topView: PropTypes.element,
    contentTransitions: Transitions,
    flowElementsTransitions: Transitions,
}

export default FlowManager