import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/index'

const Logo = ({ size }) => <Icon type='ziro' size={size} />

Logo.propTypes = {
	size: PropTypes.number
}

export default Logo