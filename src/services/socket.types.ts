export type X = number;
export type Y = number;
export type PosTuple = [X, Y];


export interface IItem {
  id: string;
  tile: ITile;
}

export interface ITile {
  path: string;
}

export interface IObstacle {
  tile: ITile;
}

export interface ICell {
  position: PosTuple;
  tile: ITile;
  obstacles: IObstacle[];
}

export interface IMatrixElement {
  position: PosTuple;
  cell: ICell;
  items: IItem[];
}

export interface IMapData {
  size: PosTuple;
  cellsData: ICell[];
}

export interface IPlayerData {
  id: string;
  position: PosTuple;
  tile: ITile;
}
