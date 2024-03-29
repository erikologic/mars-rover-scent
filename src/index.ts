export function main(input: string): void {
  const inputBoard = input.split('\n')[0]
  const [_, y] = inputBoard.split(' ').map(Number)
  if (y > 50)
    throw new Error(
      `Error while parsing the board 2nd coordinate: value is ${y} but the max value can only be 50`
    )

  throw new Error(
    'Error while parsing the board 1st coordinate: value is 99 but the max value can only be 50'
  )
}
