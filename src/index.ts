import { outputPositions } from './outputPositions'
import { parseInput } from './parseInput'
import {
  type RoverPosition,
  type Instruction,
  type Coordinate,
  type Sequence,
} from './type'

type TurnLookup = Record<
  RoverPosition['orientation'],
  RoverPosition['orientation']
>
const turnLeftLookup: TurnLookup = {
  E: 'N',
  N: 'W',
  S: 'E',
  W: 'S',
}

const turnRightLookup: TurnLookup = {
  E: 'S',
  N: 'E',
  S: 'W',
  W: 'N',
}

const turn =
  (lookup: TurnLookup) =>
  ({ x, y, orientation }: RoverPosition): RoverPosition => ({
    x,
    y,
    orientation: lookup[orientation],
  })

type InstructionCommand = (position: RoverPosition) => RoverPosition
const instruction2command: Record<Instruction, InstructionCommand> = {
  F: moveForward,
  L: turn(turnLeftLookup),
  R: turn(turnRightLookup),
}

const isOffBoard = (
  { x, y }: RoverPosition,
  { x: maxX, y: maxY }: Coordinate
): boolean => x < 0 || y < 0 || x > maxX || y > maxY

const getMoveRover =
  (topRightCoordinate: Coordinate) =>
  ({ startPosition, instructions }: Sequence): RoverPosition => {
    let oldPos = { ...startPosition }
    let newPos: RoverPosition
    for (const instruction of instructions) {
      newPos = instruction2command[instruction](oldPos)
      if (isOffBoard(newPos, topRightCoordinate))
        return { ...oldPos, lost: true }
      oldPos = newPos
    }
    return oldPos
  }

function moveForward({ x, y, orientation }: RoverPosition): RoverPosition {
  switch (orientation) {
    case 'E':
      return { x: x + 1, y, orientation }
    case 'N':
      return { x, y: y + 1, orientation }
    case 'S':
      return { x, y: y - 1, orientation }
    case 'W':
      return { x: x - 1, y, orientation }
  }
}

export function main(input: string): string {
  const { topRightBoardCoordinate, sequences } = parseInput(input)
  const moveRover = getMoveRover(topRightBoardCoordinate)
  const resultPositions = sequences.map(moveRover)
  return outputPositions(resultPositions)
}
