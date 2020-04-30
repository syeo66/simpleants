import { boardSize } from './'
import { requestDraw } from './draw/draw'

interface GameObject {
  color: string
  x: number
  y: number
}
interface Ant extends GameObject {
  lastStep: { x: number; y: number }
}
interface Scent extends GameObject {
  strength: number
}

export let objects: GameObject[] = []

let ants: Ant[] = []
let scentMap: Scent[][] = []

export const gameLoop = () => {
  for (const ant of ants) {
    const nextSteps: Scent[] = []

    for (let x = -1; x <= 1; x++) {
      const cx = ant.x + x
      if (cx < 1 || cx > boardSize.width) {
        continue
      }
      for (let y = -1; y <= 1; y++) {
        const cy = ant.y + y
        if (cx === ant.lastStep.x || cy === ant.lastStep.y) {
          continue
        }
        if (cy < 1 || cy > boardSize.width) {
          continue
        }

        if (!(x === 0 && y === 0)) {
          nextSteps.push({ ...scentMap[cx][cy] })
        }

        const addedScent = x === 0 && y === 0 ? 0.05 : 0.01
        scentMap[cx][cy].strength = scentMap[cx][cy].strength + addedScent
      }
    }

    const decision = decideWay({ nextSteps })
    ant.lastStep.x = ant.x
    ant.lastStep.y = ant.y
    ant.x = decision.x
    ant.y = decision.y
  }

  objects = [
    ...scentMap.flatMap((row) => row.map((scent) => ({ ...scent, color: `rgba(255,0,0,${scent.strength})` }))),
    ...ants,
  ]

  requestDraw()
}

export const startGameLoop = () => {
  initScent()
  initAnts()

  setInterval(gameLoop, 100)
}

const initScent = () => {
  for (let x = 1; x <= boardSize.width; x++) {
    for (let y = 1; y <= boardSize.width; y++) {
      if (!scentMap[x]) {
        scentMap[x] = []
      }
      scentMap[x][y] = { x, y, color: 'rgba(255,0,0,0)', strength: 0 }
    }
  }
  console.log(scentMap)
}

const initAnts = () => {
  ants.push({ x: 1, y: 1, color: 'black', lastStep: { x: 0, y: 0 } })
}

const decideWay = ({ nextSteps }: { nextSteps: Scent[] }) => {
  const probabilities = nextSteps.map((n) => n.strength || 0)
  const sum = probabilities.reduce((acc, p) => acc + p, 0)
  const ratio = 1 / (sum || 1)
  const borders = (!sum ? probabilities.map((p) => 1 / probabilities.length) : probabilities).reduce(
    (acc, p, i) => [...acc, i === probabilities.length - 1 ? 1 : (acc[i - 1] || 0) + p * ratio],
    [] as number[]
  )

  const decide = Math.random()
  const index = borders.findIndex((b) => b >= decide)
  const winner = nextSteps[index]

  return { x: winner.x, y: winner.y }
}
