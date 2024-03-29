import { main } from '.'

describe('Board coordinates', () => {
  test('Board coordinates must be a pair of valid numbers', () => {
    const input = `5 5\n1 1 E\nR`

    expect(() => {
      main(input)
    }).not.toThrow()
  })

  test.each([
    {
      testName: 'Max X coordinate value must be 50',
      input: `99 3\n1 1 E\nR`,
      error: /Error.*board X coordinate.*99.*max value.*50/,
    },
    {
      testName: 'Max Y coordinate value must be 50',
      input: `5 99\n1 1 E\nR`,
      error: /Error.*board Y coordinate.*99.*max value.*50/,
    },
  ])('$testName', ({ input, error }) => {
    expect(() => {
      main(input)
    }).toThrow(error)
  })
})

describe('Input is of the correct format', () => {
  test.each(['', '5\n5'])('Invalid input: %s', (input) => {
    expect(() => {
      main(input)
    }).toThrow('Invalid input structure')
  })
  test('Input is of the valid length', () => {
    const input = '5 5\n1 1 E\n' + 'F'.repeat(999)
    expect(() => {
      main(input)
    }).toThrow()
  })
})
