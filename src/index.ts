export function main(input: string): void {
  validateBoardXandY(input)
}

function breaksLimit(n: number): undefined | ['min' | 'max', number] {
  if (n < 0) return ['min', 0]
  if (n > 50) return ['max', 50]
}

function validateBoardXandY(input: string): void {
  const inputBoard = input.split('\n')[0]
  const [x, y] = inputBoard.split(' ').map(Number)
  const coordinates = { x, y }

  const key = 'x'
  const axis = key.toUpperCase()
  const value = coordinates[key]
  const limitBroken = breaksLimit(value)
  if (limitBroken !== undefined) {
    const [limit, threshold] = limitBroken
    throw new Error(
      `Error while parsing the board ${axis} coordinate: value is ${value} but the ${limit} value can only be ${threshold}`
    )
  }

  if (y < 0) {
    throw new Error(
      `Error while parsing the board Y coordinate: value is ${y} but the min value can only be 0`
    )
  }

  if (y > 50)
    throw new Error(
      `Error while parsing the board Y coordinate: value is ${y} but the max value can only be 50`
    )
}
