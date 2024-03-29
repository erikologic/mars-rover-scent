export function main(input: string): void {
  validateBoardXandY(input)
}

function validateBoardXandY(input: string): void {
  const inputBoard = input.split('\n')[0]
  const [x, y] = inputBoard.split(' ').map(Number)

  if (x < 0) {
    throw new Error(
      `Error while parsing the board X coordinate: value is ${x} but the min value can only be 0`
    )
  }

  if (x > 50)
    throw new Error(
      `Error while parsing the board X coordinate: value is ${x} but the max value can only be 50`
    )

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
