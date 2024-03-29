import { main } from "."

it('fails on max value', () => {
    const input = `500 3
1 1 E
R`

    expect(() => main(input)).toThrow('Max coordinate value is 50')
})