import { DisplayObject, Sprite, Texture } from "pixi.js";
import { ITile } from '../../services/socket.types';
import { Game } from "../game";
import { Position, PositionLike } from "../helpers/position.class";
const SIZE = 256;

export interface IBaseEntityProps {
  position: PositionLike;
}

export abstract class BaseEntity<
  TProps extends IBaseEntityProps = IBaseEntityProps,
  TObj extends DisplayObject = DisplayObject
> {
  abstract createObject(): TObj;
  object: TObj;
  _position: Position;

  get position() {
    return this._position;
  }
  
  set position(position: Position) {
    this._position = position;
    this.updateObjectPosition();
  }

  updateObjectPosition() {
    this.object.position.set(this.position.x * SIZE, this.position.y * SIZE);
  }
  
  constructor(public game: Game, public props: TProps) {
    this._position = new Position(props.position);
    this.object = this.createObject();
    this.updateObjectPosition();
  }
  
}
