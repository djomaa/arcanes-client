import { Sprite, Texture } from "pixi.js";
import { Game } from "../game";
import { Position, PositionLike } from "../helpers/position.class";
import { Entity } from './abstract.entity';
import { Interactive } from './interaction';

const SIZE = 256;

interface IProps {
  texture: Texture;
  position: PositionLike;
}

@Interactive
export class Player extends Entity {
  

}
