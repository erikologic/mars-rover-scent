import { main } from '.'

describe('Max coordinate value is 50', () => {
  it('fails on max value', () => {
    const input = `500 3
1 1 E
R`

    expect(() => {
      main(input)
    }).toThrow('Max coordinate value is 50')
  })

  it('fails on max coordinate value for the 2nd board coordinate', () => {
    const input = `5 500
1 1 E
R`

    expect(() => {
      main(input)
    }).toThrow(
      'Error while parsing the board 2nd coordinate: value is 500 but the max value can only be 50'
    )
  })
})
