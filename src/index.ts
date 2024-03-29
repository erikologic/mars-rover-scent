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

type Instruction = 'L' | 'F' | 'R'

interface RoverPosition extends Coordinate {
  orientation: 'N' | 'S' | 'E' | 'W'
}

interface Input {
  board: Coordinate
  startPosition: RoverPosition
  instructions: Instruction[]
}

function parseInput(input: string): Input {
  // TODO wrong
  if (input.length > 100) {
    throw new Error('Invalid input length')
  }

  const inputPattern = /^(\d+) (\d+)\n(\d+) (\d+) (N|S|E|W)\n(L|F|R)+$/
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
  return {
    board: { x: Number(boardX), y: Number(boardY) },
    startPosition: {
      x: Number(startX),
      y: Number(startY),
      orientation: startOrientation as RoverPosition['orientation'],
    },
    instructions: instructions.split('') as Instruction[],
  }
}

export function main(input: string): void {
  const { board, startPosition, instructions } = parseInput(input)
  validateCoordinate(board)
}
