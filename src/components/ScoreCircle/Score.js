import React from 'react'
import Range from './Range'
import { wrapper, scoreValue } from './styles'

const Score = props => {
  const { value, maxValue, width, stepsColors, style, textStyle } = props
  const getCurrentColor = num => {
    if (num <= 0) return stepsColors[0]
    if (num > stepsColors.length) return stepsColors[stepsColors.length - 1]
    return stepsColors[num - 1]
  }
  const stepRange = maxValue / stepsColors.length
  const numberHighlight = Math.ceil(value / stepRange)
  const valueSize = (36 * width) / 200
  const maxValueSize = (20 * width) / 200
  const scoreValuePosition = (25 * width) / 200
  return (
    <div style={wrapper}>
      <Range scoreNumber={Number(numberHighlight)} {...props} />
      <div
        style={{
          ...scoreValue,
          bottom: scoreValuePosition,
          color: getCurrentColor(numberHighlight),
          ...textStyle,
        }}
      >
        <span style={{ fontSize: valueSize }}>
          {value}
        </span>
        <span style={{ fontSize: maxValueSize }}>
          /
        </span>
        <span style={{ fontSize: maxValueSize }}>
          {maxValue}
        </span>
      </div>
    </div>
  )
}

export default Score