import { main } from '.'

describe('Input is of the correct format', () => {
  test.each(['', '5\n5', '5\n5\n1', '5 5\n1 1 Z\nR', '5 5\n1 1 E\nZ'])(
    'Invalid input: %s',
    (input) => {
      expect(() => {
        main(input)
      }).toThrow('Invalid input structure')
    }
  )
  test('Input is of the valid length', () => {
    expect(() => {
      main('5 5\n1 1 E\n' + 'F'.repeat(999))
    }).toThrow()

    expect(() => {
      main('5 5\n1 1 E\n' + 'F'.repeat(99))
    }).not.toThrow()
  })
})

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

describe('Start rover position', () => {
  test('Rover can only start at a valid coordinate', () => {
    const input = `5 5\n99 1 E\nR`

    expect(() => {
      main(input)
    }).toThrow()
  })
})

describe('Rover moves', () => {
  test.each([
    {
      from: '1 1 E',
      to: '2 1 E',
    },
    {
      from: '1 1 N',
      to: '1 2 N',
    },
    {
      from: '1 1 S',
      to: '1 0 S',
    },
    {
      from: '1 1 W',
      to: '0 1 W',
    },
  ])('move forward once: $from -> $to', ({ from, to }) => {
    const input = `5 5\n${from}\nF`
    expect(main(input)).toEqual(to)
  })

  test('Move forward 10 times', () => {
    const input = `30 30\n1 1 E\n${'F'.repeat(10)}`
    expect(main(input)).toEqual('11 1 E')
  })

  test.each([
    ['N', 'W'],
    ['W', 'S'],
    ['S', 'E'],
    ['E', 'N'],
  ])('Rover can turn left: %s -> %s', (from, to) => {
    const input = `5 5\n1 1 ${from}\nL`
    expect(main(input)).toEqual(`1 1 ${to}`)
  })

  test.each([
    ['N', 'E'],
    ['E', 'S'],
    ['S', 'W'],
    ['W', 'N'],
  ])('Rover can turn right: %s -> %s', (from, to) => {
    const input = `5 5\n1 1 ${from}\nR`
    expect(main(input)).toEqual(`1 1 ${to}`)
  })

  test.each([
    ['3 3 N', '3 3 N LOST'],
    ['3 3 E', '3 3 E LOST'],
    ['0 0 S', '0 0 S LOST'],
    ['0 0 W', '0 0 W LOST'],
  ])('Rover falls off the board when moving forward: %s -> %s', (from, to) => {
    const input = `3 3\n${from}\nF`
    expect(main(input)).toEqual(to)
  })
})

test('2 rovers can be moved with one transmission', () => {
  const input = `5 3
1 1 E
FF
0 3 W
FF`

  const expected = `1 3 E
0 1 N`
  expect(main(input)).toEqual(expected)
})
