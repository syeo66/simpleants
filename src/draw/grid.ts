interface GridInput {
  context: CanvasRenderingContext2D
  step: { width: number; height: number }
  x1: number
  x2: number
  y1: number
  y2: number
}
export const grid = ({ x1, y1, x2, y2, step, context }: GridInput) => {
  for (let x = x1; x <= x2; x = x + step.width) {
    context.moveTo(Math.floor(x), y1)
    context.lineTo(Math.floor(x), y2)
    context.stroke()
  }

  for (let y = y1; y <= y2; y = y + step.height) {
    context.moveTo(x1, Math.floor(y))
    context.lineTo(x2, Math.floor(y))
    context.stroke()
  }
}
