import React from 'react'
import PropTypes from 'prop-types'
import { Scaffold } from '../Scaffold'

export const Library = ({ style, onClick, size, color, strokeWidth }) =>
  <Scaffold
    svgPath={
        <>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={strokeWidth} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </>
    }
    style={style}
    onClick={onClick}
    size={size}
    color={color}
    strokeWidth={strokeWidth}
  />

Library.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
  size: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number
}