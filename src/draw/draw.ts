import { grid } from './grid'
import { boardSize, canvasSize, context } from '../'
import { objects } from '../game'

let drawPending = false

export const draw = () => {
  if (!context || !drawPending) {
    return
  }

  context.clearRect(0, 0, canvasSize.width, canvasSize.height)
  context.beginPath()

  const pixelSize = { width: canvasSize.width / boardSize.width, height: canvasSize.height / boardSize.height }

  for (const obj of objects) {
    context.beginPath()
    context.fillStyle = obj.color
    context.rect(
      Math.floor((Math.floor(obj.x) - 1) * pixelSize.width),
      Math.floor((Math.floor(obj.y) - 1) * pixelSize.height),
      Math.floor(pixelSize.width),
      Math.floor(pixelSize.height)
    )
    context.fill()
  }
  grid({ x1: 0, y1: 0, x2: canvasSize.width, y2: canvasSize.height, context, step: pixelSize })

  drawPending = false
}

export const requestDraw = () => {
  drawPending = true
}
