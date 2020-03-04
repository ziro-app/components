import React from 'react'
import Icon from '../Icon'
import PropTypes from 'prop-types'
import { brandContainer } from './styles'

const _BrandIcon = ({ brand }) =>
    <div style={brandContainer}>
        { brand && <Icon type={brand} size={35} color='white'/> }
    </div>

_BrandIcon.propTypes = {
    brand: PropTypes.string
}

export const BrandIcon = React.memo(_BrandIcon)