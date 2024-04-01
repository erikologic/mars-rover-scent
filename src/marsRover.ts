import { getMoveRover } from './moveRover'
import { outputPositions } from './outputPositions'
import { parseInput } from './parseInput'

export function main(input: string): string {
  const { topRightBoardCoordinate, sequences } = parseInput(input)
  const moveRover = getMoveRover(topRightBoardCoordinate)
  const resultPositions = sequences.map(moveRover)
  return outputPositions(resultPositions)
}
