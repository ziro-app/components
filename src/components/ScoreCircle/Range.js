import React, { useRef, useEffect } from 'react'
import drawCanvas from './drawCanvas'
import { rangeSvg } from './styles'

const Range = props => {
  const canvasRef = useRef(null)
  useEffect(() => {
    drawCanvas(canvasRef, props)
  }, [])
  return (
    <canvas
      style={rangeSvg}
      ref={canvasRef}
      width={props.width}
      height={props.width}
    />
  )
}
export default Range