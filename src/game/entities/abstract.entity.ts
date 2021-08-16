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

export abstract class Entity extends BaseEntity {
  object: Sprite;

  constructor(game: Game, props: IEntityProps) {
    super(game, props);
    const texture = this.game.loader.getTile(props.tile.path);
    this.object = new Sprite(texture);
    this.updateObjectPosition();
  }
  
}
