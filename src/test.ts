import { main } from '.'

describe('Board coordinates', () => {
  test('Max X coordinate value must be 50', () => {
    const input = `99 3
1 1 E
R`

    expect(() => {
      main(input)
    }).toThrow(
      'Error while parsing the board 1st coordinate: value is 99 but the max value can only be 50'
    )
  })

  test('Max Y coordinate value must be 50', () => {
    const input = `5 500\n1 1 E\nR`

    expect(() => {
      main(input)
    }).toThrow(
      `Error while parsing the board 2nd coordinate: value is 500 but the max value can only be 50`
    )
  })
})
