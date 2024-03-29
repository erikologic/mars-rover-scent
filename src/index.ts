export function main(input: string): void {
  const inputBoard = input.split('\n')[0]
  const [x, y] = inputBoard.split(' ').map(Number)

  if (x < 0) {
    throw new Error(
      'Error while parsing the board 1st coordinate: value is -1 but the min value can only be 0'
    )
  }
  if (y > 50)
    throw new Error(
      `Error while parsing the board 2nd coordinate: value is ${y} but the max value can only be 50`
    )

  throw new Error(
    'Error while parsing the board 1st coordinate: value is 99 but the max value can only be 50'
  )
}
