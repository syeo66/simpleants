import { draw } from './draw'

export const animate = () => {
  requestAnimationFrame(animate)
  draw()
}
