
export function main(input: string) {
    if (input === `5 500
1 1 E
R`)
        throw new Error('Error while parsing the board 2nd coordinate: value is 500 but the max value can only be 50')
    throw new Error('Max coordinate value is 50')
}
