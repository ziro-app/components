import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/index'

const Logo = ({ size, style }) => <Icon type='ziro' size={size} style={style} />

Logo.propTypes = {
	size: PropTypes.number,
	style: PropTypes.object
}

export default Logo