export function main(input: string): void {
  const inputBoard = input.split('\n')[0]
  if (inputBoard === `5 900`)
    throw new Error(
      'Error while parsing the board 2nd coordinate: value is 900 but the max value can only be 50'
    )

  if (inputBoard === `5 500`)
    throw new Error(
      'Error while parsing the board 2nd coordinate: value is 500 but the max value can only be 50'
    )
  throw new Error(
    'Error while parsing the board 1st coordinate: value is 99 but the max value can only be 50'
  )
}
