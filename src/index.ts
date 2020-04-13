import { animate } from './animate'
import { startGameLoop } from './game'

export const canvasSize = { width: 396, height: 396 }
export const boardSize = { width: 12, height: 12 }

export const canvas = document.getElementById('root') as HTMLCanvasElement
export const context = canvas.getContext('2d')

export const main = () => {
  canvas.height = canvasSize.height + 1
  canvas.width = canvasSize.width + 1

  if (!context) {
    return
  }

  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.strokeStyle = 'black'
  context.lineWidth = 1
  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'

  context.translate(0.5, 0.5)

  animate()
  startGameLoop()
}

main()
