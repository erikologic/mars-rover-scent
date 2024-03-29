function breaksLimit(n: number): undefined | ['min' | 'max', number] {
  if (n < 0) return ['min', 0]
  if (n > 50) return ['max', 50]
}

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
  const limitBroken = breaksLimit(value)
  if (limitBroken !== undefined) {
    const [limit, threshold] = limitBroken
    throw new Error(
      `Error while parsing the board ${axis} coordinate: value is ${value} but the ${limit} value can only be ${threshold}`
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
  if (input.match(/^\d+ \d+\n\d+ \d+ [A-Z]\n[A-Z]+$/m) === null) {
    throw new Error('Invalid input structure')
  }
  validateBoardXandY(input)
}
