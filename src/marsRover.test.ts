import { main } from './marsRover'

describe('Validate input', () => {
  describe('Wrong input format is properly flagged', () => {
    test.each([
      ['', 'Invalid input lines length'],
      ['5\n5\n5\n5', 'Invalid input lines length'],
      ['5\n5\n1', 'Top right board coordinate must be a pair of numbers'],
      ['5 5\n1\nR', 'Invalid start position input stucture'],
      ['5 5\n1 1 Z\nR', 'Orientation must be one of N, S, E, W'],
      ['5 5\n1 1 E\n666', 'Instructions must be a sequence of L, F, R'],
      ['5 5\n1 1 E\nABCDEG', 'Instructions must be a sequence of L, F, R'],
      [
        '5 5\n1 1 E\n' + 'F'.repeat(100),
        'Cannot have more than 99 instructions',
      ],
    ])('Invalid input: %s -> %s', (input, error) => {
      expect(() => {
        main(input)
      }).toThrow(error)
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
        error: /X.*99.*max value.*50/,
      },
      {
        testName: 'Max Y coordinate value must be 50',
        input: `5 99\n1 1 E\nR`,
        error: /Y.*99.*max value.*50/,
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
      }).toThrow(/X.*99.*max value.*50/)
    })
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
  ])('Move forward once: $from -> $to', ({ from, to }) => {
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

  test('2 rovers can be moved with one transmission', () => {
    const input = `5 3
1 1 E
FF
0 1 N
FF`

    const expected = `3 1 E
0 3 N`
    expect(main(input)).toEqual(expected)
  })

  test('Lost rover leaves a scent', () => {
    const input = `3 3
1 1 E
FFF
1 1 E
FFFLF`

    const expected = `3 1 E LOST
3 2 N`
    expect(main(input)).toEqual(expected)
  })
})

test('README example', () => {
  const input = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`

  const expected = `1 1 E
3 3 N LOST
2 3 S`
  expect(main(input)).toEqual(expected)
})
