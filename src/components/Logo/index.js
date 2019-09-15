import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'cloudinary-react'

const Logo = ({ width = '45' }) =>
	<Image
		cloudName='ziro'
		width={width}
		publicId='logo-app_fwothv'
		version='1561160634'
		format='png'
		secure='true'
		alt='logo'
	/>

Logo.propTypes = {
	width: PropTypes.string
}

export default Logo