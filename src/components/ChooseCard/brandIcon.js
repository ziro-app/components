import React from 'react'
import Icon from '../Icon'
import PropTypes from 'prop-types'
import { primaryColor } from '@ziro/theme'

const _BrandIcon = ({ brand }) =>
    brand ?
        <Icon type={brand} size={30} color={primaryColor}/>
    :
        <div style={{ width: 30, height: 30 }}/>

_BrandIcon.propTypes = {
    brand: PropTypes.string
}

export const BrandIcon = React.memo(_BrandIcon)