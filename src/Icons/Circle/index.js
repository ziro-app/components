import React from 'react'
import PropTypes from 'prop-types'
import { primaryColor } from '@ziro/theme'
import { Scaffold } from '../Scaffold';

export const Circle = ({ style, onClick, size, color, strokeWidth }) =>
  <Scaffold
    svgPath={
      <>
        <circle cx="12" cy="12" r="10"></circle>
      </>
    }
    style={style}
    onClick={onClick}
    size={size}
    color={color}
    strokeWidth={strokeWidth}
  />

Circle.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
}

