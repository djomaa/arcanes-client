export type X = number;
export type Y = number;
export type Position = [X, Y];


export interface IItem {
  id: string;
}

export interface ITile {
  path: string;
}

export interface ICell {
  tile: ITile;
}

export interface IMatrixElement {
  position: Position;
  cell: ICell;
  items: IItem
}

export interface IMapData {
  size: Position;
  matrix: IMatrixElement[];
}
