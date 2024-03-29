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

function validateBoardXandY(input: string): void {
  const inputBoard = input.split('\n')[0]
  const [x, y] = inputBoard.split(' ').map(Number)
  const coordinate = { x, y }

  validateCoordinate(coordinate)
}

export function main(input: string): void {
  if (input.length > 100) {
    throw new Error('Invalid input length')
  }
  if (input.match(/^\d+ \d+\n\d+ \d+ [A-Z]\n[A-Z]+$/m) === null) {
    throw new Error('Invalid input structure')
  }
  validateBoardXandY(input)
}
