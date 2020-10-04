import hex2rgba from './hex2rgba'

const drawCanvas = (canvasRef, props) => {
  const canvas = canvasRef.current
  const context = canvas.getContext('2d')
  const { width, maxAngle, rotation, stepsColors, lineGap, lineWidth, scoreNumber, fadedOpacity } = props
  // change size canvas when HDPI screen
  const pixelRatio = window.devicePixelRatio
  const wRatio = width * pixelRatio
  canvas.width = wRatio
  canvas.height = wRatio
  const halfWidth = wRatio / 2
  const pieSize = maxAngle / stepsColors.length
  context.clearRect(halfWidth * -1, halfWidth * -1, wRatio, wRatio)
  context.resetTransform()
  context.translate(wRatio / 2, wRatio / 2)
  context.rotate(Math.PI * 2 * ((rotation + (360 - maxAngle - lineGap) / 2) / 360))
  let lastval = 0
  for (let i = 0; i < stepsColors.length; i++) {
    context.beginPath()
    context.arc(
      0,
      0,
      halfWidth - lineWidth * pixelRatio / 2,
      Math.PI * 2 * ((lastval + lineGap) / 360),
      Math.PI * 2 * ((lastval + pieSize) / 360),
    )
    lastval += pieSize
    if (scoreNumber < i + 1) context.strokeStyle = hex2rgba(stepsColors[i], fadedOpacity)
    else context.strokeStyle = stepsColors[i]
    context.lineWidth = lineWidth * pixelRatio
    context.stroke()
  }
}

export default drawCanvas