import { DisplayObject, Sprite, Texture } from "pixi.js";
import { ITile } from '../../services/socket.types';
import { SPRITE_SIZE } from '../../config';
import { Game } from "../game";
import { Position, PositionLike } from "../helpers/position.class";

export interface IBaseEntityProps {
  position: PositionLike;
}

export abstract class BaseEntity {
  abstract object: DisplayObject;
  _position: Position;

  get position() {
    return this._position;
  }
  
  set position(position: Position) {
    this._position = position;
    this.updateObjectPosition();
  }

  updateObjectPosition() {
    this.object.position.set(this.position.x * SPRITE_SIZE, this.position.y * SPRITE_SIZE);
  }
  
  constructor(protected game: Game, props: IBaseEntityProps) {
    this._position = new Position(props.position);
  }
  
}
