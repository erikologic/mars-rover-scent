import {
  type Coordinate,
  type RoverPosition,
  type Instruction,
  type Input,
  validOrientations,
  validInstructions,
  type Sequence,
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

const orientationRegex = new RegExp(`^(${validOrientations.join('|')})$`)
function validateRoverOrientation(
  orientation: string
): asserts orientation is RoverPosition['orientation'] {
  if (!orientationRegex.test(orientation)) {
    throw new Error('Invalid input structure')
  }
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

function createStartPositionNew(input: string): RoverPosition {
  const inputPattern = /^(\d+) (\d+) ([A-Z])$/
  const [match, startX, startY, startOrientation] =
    inputPattern.exec(input) ?? []
  if (!match) throw new Error('Invalid input structure')
  validateRoverOrientation(startOrientation)
  const startPosition = {
    x: Number(startX),
    y: Number(startY),
    orientation: startOrientation,
  }
  validateCoordinate(startPosition)
  return startPosition
}

function createInstructionsNew(input: string): Instruction[] {
  if (input.length > 100) throw new Error('Invalid input structure')

  const inputPattern = /^([A-Z]+)$/
  const [match, instructions] = inputPattern.exec(input) ?? []
  if (!match) throw new Error('Invalid input structure')
  const listInstructions = instructions.split('')
  validateInstructions(listInstructions)
  return listInstructions
}

function createSequences(sequencesInputs: string[]): Sequence[] {
  const sequences = []
  for (let i = 0; i < sequencesInputs.length; i += 2) {
    sequences.push({
      startPosition: createStartPositionNew(sequencesInputs[i]),
      instructions: createInstructionsNew(sequencesInputs[i + 1]),
    })
  }
  return sequences
}

export function parseInput(input: string): Input {
  const inputs = input.split('\n')
  const length = inputs.length
  if (length < 3 || (length - 1) % 2 !== 0) {
    throw new Error('Invalid input structure')
  }

  const [boardInput, ...sequencesInputs] = inputs

  return {
    topRightBoardCoordinate: createTopRightBoardCoordinate(boardInput),
    sequences: createSequences(sequencesInputs),
  }
}
