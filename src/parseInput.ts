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

const orientationRegex = new RegExp(`^(${validOrientations.join('|')})$`)
function validateRoverOrientation(
  orientation: string
): asserts orientation is RoverPosition['orientation'] {
  if (!orientationRegex.test(orientation)) {
    throw new Error('Invalid input structure')
  }
}

const instructionRegex = new RegExp(`^(${validInstructions.join('|')})+$`)
function validateInstructions(
  instructions: string[]
): asserts instructions is Instruction[] {
  if (!instructionRegex.test(instructions.join(''))) {
    throw new Error('Invalid input structure')
  }
}

export function parseInput(input: string): Input {
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
  if (!match || instructions.length > 100) {
    throw new Error('Invalid input structure')
  }

  validateRoverOrientation(startOrientation)

  const listInstructions = instructions.split('')
  validateInstructions(listInstructions)

  const topRightBoardCoordinate = {
    x: Number(boardX),
    y: Number(boardY),
  }
  validateCoordinate(topRightBoardCoordinate)

  const startPosition = {
    x: Number(startX),
    y: Number(startY),
    orientation: startOrientation,
  }
  validateCoordinate(startPosition)
  return {
    topRightBoardCoordinate,
    startPosition,
    instructions: listInstructions,
  }
}
