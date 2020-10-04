import React, { useRef, useEffect } from 'react'
import drawCanvas from './drawCanvas'

const Range = props => {
  const canvasRef = useRef(null)
  useEffect(() => {
    drawCanvas(canvasRef, props)
  }, [])
  return (
    <canvas
      ref={canvasRef}
      width={props.width}
      height={props.width}
    />
  )
}
export default Range