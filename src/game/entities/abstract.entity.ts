import { Sprite, Texture } from "pixi.js";
import { ITile } from '../../services/socket.types';
import { Game } from "../game";
import { Position, PositionLike } from "../helpers/position.class";
import { BaseEntity } from './abstract.base-entity';
const SIZE = 256;

export interface IEntityProps {
  tile: ITile;
  position: PositionLike;
}

export abstract class Entity extends BaseEntity<IEntityProps, Sprite> {

  createObject() {
    const texture = this.game.loader.get(this.props.tile.path);
    return new Sprite(texture);
  }
  
}
