import React from 'react'
import PropTypes from 'prop-types'
import Summary from '../Summary'
import { useHeader, useFooter, useAnimatedLocation } from '../FlowManager'
import BottomFlowButtons from '../BottomFlowButtons'
import Header from '../HeaderFlow'
import { useCallback } from 'react'

const FlowSummary = ({ seller, charge, maxInstallments, misc, nextLocation }) => {

    const setLocation = useAnimatedLocation()[1]
    const onNext = useCallback(() => setLocation('goLeft',nextLocation), [nextLocation, setLocation])

    useFooter(<BottomFlowButtons next={onNext} />)
    useHeader(<Header title='Sumário' />)

    return (
            <Summary
                seller={seller}
                charge={charge}
                maxInstallments={maxInstallments}
                misc={misc}
            />
    )
}

FlowSummary.propTypes = {
    ...Summary.propTypes,
    nextLocation: PropTypes.string.isRequired
}

export default FlowSummary