import React from 'react'
import PropTypes from 'prop-types'
import RegisterCard from '../RegisterCard'
import FlowManager from '../FlowManager'

const FlowRegisterCard = ({ numbers, onChange, onSend, onError }) => {
    return (
        <FlowManager
            title='Adcionar um novo cartão'
            onError={onError}
            height={'100vh'}
        >
            <RegisterCard/>
        </FlowManager>
    )
}

FlowRegisterCard.propTypes = {
    ...RegisterCard.propTypes,
    next: PropTypes.shape({
        onClick: PropTypes.func,
        location: PropTypes.string
    }).isRequired,
    previous: PropTypes.shape({
        onClick: PropTypes.func,
        location: PropTypes.string
    }).isRequired,
    onError: PropTypes.func
}

export default FlowRegisterCard