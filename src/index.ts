interface Coordinate {
  x: number
  y: number
}

function validateCoordinateNumber(
  key: keyof Coordinate,
  coordinate: Coordinate
): void {
  const axis = key.toUpperCase()
  const value = coordinate[key]
  const threshold = 50
  const limitBroken = value > threshold
  if (limitBroken) {
    throw new Error(
      `Error while parsing the board ${axis} coordinate: value is ${value} but the max value can only be ${threshold}`
    )
  }
}

function validateCoordinate(coordinate: Coordinate): void {
  validateCoordinateNumber('x', coordinate)
  validateCoordinateNumber('y', coordinate)
}

const validInstructions = ['L', 'F', 'R'] as const
const instructionRegex = new RegExp(`^(${validInstructions.join('|')})+$`)

type Instruction = (typeof validInstructions)[number]

const validOrientations = ['N', 'S', 'E', 'W'] as const
const orientationRegex = new RegExp(`^(${validOrientations.join('|')})$`)

interface RoverPosition extends Coordinate {
  orientation: (typeof validOrientations)[number]
  lost?: boolean
}

interface Input {
  topRightBoardCoordinate: Coordinate
  startPosition: RoverPosition
  instructions: Instruction[]
}

function validateRoverOrientation(
  orientation: string
): asserts orientation is RoverPosition['orientation'] {
  if (!orientationRegex.test(orientation)) {
    throw new Error('Invalid input structure')
  }
}

function validateInstructions(
  instructions: string[]
): asserts instructions is Instruction[] {
  if (!instructionRegex.test(instructions.join(''))) {
    throw new Error('Invalid input structure')
  }
}

function parseInput(input: string): Input {
  // TODO wrong
  if (input.length > 100) {
    throw new Error('Invalid input length')
  }

  const inputPattern = /^(\d+) (\d+)\n(\d+) (\d+) ([A-Z])\n([A-Z]+)$/
  const [
    match,
    boardX,
    boardY,
    startX,
    startY,
    startOrientation,
    instructions,
  ] = inputPattern.exec(input) ?? []
  if (!match) {
    throw new Error('Invalid input structure')
  }
  validateRoverOrientation(startOrientation)
  const listInstructions = instructions.split('')
  validateInstructions(listInstructions)
  return {
    topRightBoardCoordinate: { x: Number(boardX), y: Number(boardY) },
    startPosition: {
      x: Number(startX),
      y: Number(startY),
      orientation: startOrientation,
    },
    instructions: listInstructions,
  }
}

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

const moveRover = (
  startPosition: RoverPosition,
  topRightCoordinate: Coordinate,
  instructions: Instruction[]
): RoverPosition => {
  let oldPos = { ...startPosition }
  let newPos: RoverPosition
  for (const instruction of instructions) {
    newPos = instruction2command[instruction](oldPos)
    if (newPos.x > topRightCoordinate.x || newPos.y > topRightCoordinate.y) {
      return { ...oldPos, lost: true }
    }
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

function stringifyPosition({ x, y, orientation, lost }: RoverPosition): string {
  let s = `${x} ${y} ${orientation}`
  if (lost) {
    s += ' LOST'
  }
  return s
}

export function main(input: string): string {
  const { topRightBoardCoordinate, startPosition, instructions } =
    parseInput(input)
  validateCoordinate(topRightBoardCoordinate)
  validateCoordinate(startPosition)
  const lastPosition = moveRover(
    startPosition,
    topRightBoardCoordinate,
    instructions
  )
  return stringifyPosition(lastPosition)
}
