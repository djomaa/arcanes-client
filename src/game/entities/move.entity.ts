import { OutlineFilter } from '@pixi/filter-outline';
import { Rectangle, Sprite, Texture } from "pixi.js";
import { ITile } from '../../services/socket.types';
import { SPRITE_SIZE } from '../../config';
import { Game } from "../game";
import { createTexture } from '../helpers/draw.helper';
import { Position, PositionLike } from "../helpers/position.class";
import { BaseEntity } from './abstract.base-entity';
import { ACTION, Interaction, Interactive } from './interaction';

export interface IEntityProps {
  position: PositionLike;
}

const ON = 0.6;
const OFF = 0.4;

@Interactive
export class Move extends BaseEntity {
  object: Sprite;
  filter = new OutlineFilter(1, 0xff0000);

  constructor(game: Game, public props: IEntityProps) {
    super(game, props);
    // this.object = new Sprite(Texture.WHITE);
    this.object = new Sprite(createTexture(0x000000, this.game.app, [SPRITE_SIZE, SPRITE_SIZE]));
    // this.object.
    this.object.alpha = OFF
    this.object.width = SPRITE_SIZE;
    this.object.height = SPRITE_SIZE;
    this.object.hitArea = new Rectangle(
      // this.position.x * SPRITE_SIZE,
      // this.position.y * SPRITE_SIZE,
      0,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE,
    );
    this.object.filters = [this.filter];
    this.filter.enabled = false;
    // this.object.interactive = true;
    // this.object.buttonMode = true;
    this.updateObjectPosition();
  }

  @Interaction(ACTION.MOUSE_OVER)
  onMouseOver() {
    // this.object.alpha = ON;
    // this.object.filters = [this.filter];
    this.filter.enabled = true;
  }

  @Interaction(ACTION.MOUSE_OUT)
  onMouseOut() {
    // this.object.alpha = OFF;
    // this.object.filters = [];
    this.filter.enabled = false;
  }

  @Interaction(ACTION.CLICK)
  onClick() {
    this.game.move(this.position);
  }
  
}
