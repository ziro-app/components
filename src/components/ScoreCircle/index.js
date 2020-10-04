import React from 'react'
import PropTypes from 'prop-types'
import Range from './Range'
import getCurrentColor from './utils/getCurrentColor'
import { container, scoreValue } from './styles'

const ScoreCircle = props => {
  const { value, maxValue, width, stepsColors } = props
  const stepRange = maxValue / stepsColors.length
  const currentStep = Math.ceil(value / stepRange)
  const scoreValuePosition = (140 * width) / 200
  const scoreValueColor = getCurrentColor(currentStep, stepsColors)
  const valueSize = (36 * width) / 200
  const maxValueSize = (20 * width) / 200
  return (
    <div style={container}>
      <Range scoreNumber={Number(currentStep)} {...props} />
      <div style={scoreValue(scoreValuePosition, scoreValueColor)}>
        <span style={{ fontSize: valueSize }}>{value}</span>
        <span style={{ fontSize: maxValueSize }}>/</span>
        <span style={{ fontSize: maxValueSize }}>{maxValue}</span>
      </div>
    </div>
  )
}

ScoreCircle.propTypes = {

}

export default ScoreCircle