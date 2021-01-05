import React from 'react'
import PropTypes from 'prop-types'
import Range from './Range'
import getCurrentColor from './utils/getCurrentColor'
import { container, scoreValue, scoreText } from './styles'

const ScoreCircle = props => {
  const { value, maxValue, width, stepsColors } = props
  const fixedValue = value > maxValue ? maxValue : value;
  const stepRange = maxValue / stepsColors.length
  const currentStep = Math.ceil((fixedValue) / stepRange)
  const scoreValuePosition = (165 * width) / 230
  const scoreValueColor = getCurrentColor(currentStep, stepsColors)
  const valueSize = (36 * width) / 230
  const maxValueSize = (18 * width) / 230
  const classification = fixedValue <= 300 ? 'Baixo Score' : (fixedValue > 300 && fixedValue <= 700) ? 'Médio Score' : 'Bom Score'
  return (
    <div style={container}>
      <Range scoreNumber={Number(currentStep)} {...props} />
      <div style={scoreValue(scoreValuePosition, scoreValueColor)}>
        <span style={{ fontSize: valueSize }}>{fixedValue}</span>
        <span style={{ fontSize: maxValueSize }}>/</span>
        <span style={{ fontSize: maxValueSize }}>{maxValue}</span>
        <label style={scoreText(scoreValueColor)}>{classification}</label>
      </div>
    </div>
  )
}

ScoreCircle.propTypes = {
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  lineWidth: PropTypes.number.isRequired,
  lineSpacing: PropTypes.number.isRequired,
  lineGap: PropTypes.number.isRequired,
  maxAngle: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
  stepsColors: PropTypes.array.isRequired,
  fadedOpacity: PropTypes.number.isRequired,
}

export default ScoreCircle