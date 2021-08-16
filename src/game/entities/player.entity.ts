import { Graphics, Sprite, Texture } from "pixi.js";
import { IPlayer, ITeam, ITile } from '../../services/socket.types';
import { SPRITE_SIZE } from '../../config';
import { Game } from "../game";
import { Position, PositionLike } from "../helpers/position.class";
import { BaseEntity } from './abstract.base-entity';
import { Entity } from './abstract.entity';
import { Interactive } from './interaction';

const SIZE = 256;

interface IProps {
  position: Position;
  tile: ITile;
  yFactor: number;
}

@Interactive
export class Player extends Entity {
  yFactor: number;

  constructor(game: Game,props: IProps) {
    super(game, {
      position: props.position,
      tile: props.tile,
    });
    this.yFactor = props.yFactor;
    this.object.scale.set(0.25);
    this.object.anchor.set(0.5);
    this.updateObjectPosition();
    // this.position = new Position(
    //   this.position.x + SPRITE_SIZE / 2,
    //   this.position.y + SPRITE_SIZE * 3/4,
    //   )
  }

  updateObjectPosition() {
    console.log('SET', this.yFactor,
    this.position.y + SPRITE_SIZE * 3/4)
    console.log(this);
    this.object.position.set(
      this.position.x * SPRITE_SIZE + SPRITE_SIZE / 2,
      this.position.y * SPRITE_SIZE + SPRITE_SIZE * this.yFactor,
    );
  }
}
/*
// @Interactive
export class Player extends BaseEntity {
  object = new Graphics();

  constructor(game: Game, props: any) {
    super(game, props);
    this.object = new Graphics();
    this.object.lineStyle(10, 0xFFBD01, 1);
    this.object.beginFill(0xC34288, 1);
    this.object.drawCircle(0, 0, 128);
    this.object.endFill();
    this.updateObjectPosition();
    console.log('a', this.object)
  }


}*/
