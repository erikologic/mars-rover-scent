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

export const getMoveRover = (
  topRightCoordinate: Coordinate
): ((s: Sequence) => RoverPosition) => {
  const lostRoversPosAndInstructions = new Set<string>()

  return ({ startPosition, instructions }: Sequence): RoverPosition => {
    let oldPos = { ...startPosition }
    let newPos: RoverPosition
    for (const instruction of instructions) {
      newPos = instruction2command[instruction](oldPos)

      if (instruction === 'F') {
        const hashedPosAndInstructions = JSON.stringify({
          ...oldPos,
          instruction,
        })

        if (lostRoversPosAndInstructions.has(hashedPosAndInstructions)) {
          continue
        }

        if (isOffBoard(newPos, topRightCoordinate)) {
          lostRoversPosAndInstructions.add(hashedPosAndInstructions)
          return { ...oldPos, lost: true }
        }
      }

      oldPos = newPos
    }
    return oldPos
  }
}
