export const validInstructions = ['L', 'F', 'R'] as const
export type Instruction = (typeof validInstructions)[number]

export const validOrientations = ['N', 'S', 'E', 'W'] as const
export type Orientation = (typeof validOrientations)[number]

export interface Coordinate {
  x: number
  y: number
}

export interface RoverPosition extends Coordinate {
  orientation: Orientation
  lost?: boolean
}

interface Sequence {
  startPosition: RoverPosition
  instructions: Instruction[]
}
export interface Input {
  topRightBoardCoordinate: Coordinate
  sequences: Sequence[]
}
