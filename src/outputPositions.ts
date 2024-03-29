import { type RoverPosition } from './type'

function outputPosition({ x, y, orientation, lost }: RoverPosition): string {
  let s = `${x} ${y} ${orientation}`
  if (lost) {
    s += ' LOST'
  }
  return s
}

export function outputPositions(positions: RoverPosition[]): string {
  return positions.map(outputPosition).join('\n')
}
