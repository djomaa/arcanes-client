type X = number;
type Y = number;
type InTuple = [X, Y]
type InObject = { x: X, y: Y }

export type PositionLike = Position | InTuple | InObject;

export class Position {
  readonly x: X;
  readonly y: Y;
  private readonly iterable: [X, Y];

  public constructor(...args: InTuple | [PositionLike]) {
    const [x, y] = args;
    if (x instanceof Position) {
      this.x = x.x;
      this.y = x.y;
    } else if (Array.isArray(x)) {
      this.x = x[0];
      this.y = x[1];
    } else if (typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
    } else if (y === undefined) {
      throw new Error('provide Y'); // TODO: refactor error
    } else {
      this.x = x;
      this.y = y;
    }

    this.iterable = [this.x, this.y];
  }

  [Symbol.iterator]() {
    let i = 0;
    return {
      current: () => this.iterable[i],
      next: () => ({
        value: this.iterable[i++],
        done: i > this.iterable.length,
      })
    }
  }

  toString() {
    return `(${this.x};${this.y})`;
  }

  prepare() {
    return this.iterable;
  }

  get key(): string {
    return `${this.x}:${this.y}`;
  }

}


export function Pos(...args: ConstructorParameters<typeof Position>): Position {
  return new Position(...args);
}
