import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import Header from '../Header'
import { FlowDiv } from './FlowDiv.js'
import { useFlowContent } from './useFlowContent'
import { contentTransitions as _contentTransitions, flowElementsTransitions as _flowElementsTransitions } from './defaultTransitions'
import { doubleButton, singleButton, container, scrollShadowTop, scrollShadowBottom } from './styles'

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
    hookDeps,
    contentTransitions = _contentTransitions,
    flowElementsTransitions = _flowElementsTransitions,
}) => {

    const [contentScroll, scrollMaxInset, scrollInsetBottom, scrollInsetTop, overflow] = useFlowContent(hookDeps)

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
                contentScroll={contentScroll}
                controls={controls}
                style={{ overflow }}
            >
                <div style={scrollShadowTop(scrollInsetTop, scrollMaxInset)}/>
                <div style={{ overflow: 'visible', padding: '0px 20px' }}>
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