import {
  type Coordinate,
  type RoverPosition,
  type Instruction,
  type Input,
  validOrientations,
  validInstructions,
  type Sequence,
} from './type'

const coordinateThreshold = 50
const instructionThreshold = 99

function validateCoordinateNumber(
  key: keyof Coordinate,
  coordinate: Coordinate
): void {
  const value = coordinate[key]
  const limitBroken = value > coordinateThreshold
  if (limitBroken) {
    const axis = key.toUpperCase()
    throw new Error(
      `${axis} coordinate is ${value} but the max value is ${coordinateThreshold}`
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
    throw new Error(
      `Instructions must be a sequence of ${validInstructions.join(', ')}`
    )
  }
}

function createInstructionsNew(input: string): Instruction[] {
  if (input.length > instructionThreshold)
    throw new Error(
      `Cannot have more than ${instructionThreshold} instructions`
    )

  const inputPattern = /^([A-Z]+)$/
  const [match, instructionString] = inputPattern.exec(input) ?? []
  if (!match)
    throw new Error(
      `Instructions must be a sequence of ${validInstructions.join(', ')}`
    )
  const instructions = instructionString.split('')
  validateInstructions(instructions)
  return instructions
}

const orientationRegex = new RegExp(`^(${validOrientations.join('|')})$`)
function validateRoverOrientation(
  orientation: string
): asserts orientation is RoverPosition['orientation'] {
  if (!orientationRegex.test(orientation)) {
    throw new Error(
      `Orientation must be one of ${validOrientations.join(', ')}`
    )
  }
}

function createStartPosition(input: string): RoverPosition {
  const inputPattern = /^(\d+) (\d+) ([A-Z])$/
  const [match, startX, startY, startOrientation] =
    inputPattern.exec(input) ?? []
  if (!match) throw new Error('Invalid start position input stucture')
  validateRoverOrientation(startOrientation)
  const startPosition = {
    x: Number(startX),
    y: Number(startY),
    orientation: startOrientation,
  }
  validateCoordinate(startPosition)
  return startPosition
}

function createSequences(sequencesInputs: string[]): Sequence[] {
  const sequences = []
  for (let i = 0; i < sequencesInputs.length; i += 2) {
    sequences.push({
      startPosition: createStartPosition(sequencesInputs[i]),
      instructions: createInstructionsNew(sequencesInputs[i + 1]),
    })
  }
  return sequences
}

function createTopRightBoardCoordinate(input: string): Coordinate {
  const inputPattern = /^(\d+) (\d+)$/
  const [match, boardX, boardY] = inputPattern.exec(input) ?? []
  if (!match)
    throw new Error('Top right board coordinate must be a pair of numbers')
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
    throw new Error('Invalid input lines length')
  }

  const [boardInput, ...sequencesInputs] = inputs

  return {
    topRightBoardCoordinate: createTopRightBoardCoordinate(boardInput),
    sequences: createSequences(sequencesInputs),
  }
}
