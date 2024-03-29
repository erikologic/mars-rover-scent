import {
  type Coordinate,
  type RoverPosition,
  type Instruction,
  type Input,
  validOrientations,
  validInstructions,
} from './type'

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

const instructionRegex = new RegExp(`^(${validInstructions.join('|')})+$`)
function validateInstructions(
  instructions: string[]
): asserts instructions is Instruction[] {
  if (!instructionRegex.test(instructions.join(''))) {
    throw new Error('Invalid input structure')
  }
}

function createInstructions(instructions: string): Instruction[] {
  if (instructions.length > 100) {
    throw new Error('Invalid input structure')
  }

  const listInstructions = instructions.split('')
  validateInstructions(listInstructions)
  return listInstructions
}

const orientationRegex = new RegExp(`^(${validOrientations.join('|')})$`)
function validateRoverOrientation(
  orientation: string
): asserts orientation is RoverPosition['orientation'] {
  if (!orientationRegex.test(orientation)) {
    throw new Error('Invalid input structure')
  }
}

function createStartPosition(
  startX: string,
  startY: string,
  startOrientation: string
): RoverPosition {
  validateRoverOrientation(startOrientation)
  const startPosition = {
    x: Number(startX),
    y: Number(startY),
    orientation: startOrientation,
  }
  validateCoordinate(startPosition)
  return startPosition
}

function createTopRightBoardCoordinate(input: string): Coordinate {
  const inputPattern = /^(\d+) (\d+)$/
  const [match, boardX, boardY] = inputPattern.exec(input) ?? []
  if (!match) throw new Error('Invalid input structure')
  const topRightBoardCoordinate = {
    x: Number(boardX),
    y: Number(boardY),
  }
  validateCoordinate(topRightBoardCoordinate)
  return topRightBoardCoordinate
}
export function parseInput(input: string): Input {
  const inputs = input.split('\n')
  const length = inputs.length
  if (length < 3 || (length - 1) % 2 !== 0) {
    throw new Error('Invalid input structure')
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

  if (!match) throw new Error('Invalid input structure')

  return {
    topRightBoardCoordinate: createTopRightBoardCoordinate(inputs[0]),
    startPosition: createStartPosition(startX, startY, startOrientation),
    instructions: createInstructions(instructions),
  }
}
