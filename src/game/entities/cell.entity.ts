import { Container, RenderTexture, Sprite } from 'pixi.js';
import { IObstacle, ITile } from '../../services/socket.types';
import { Game } from '../game';
import { BaseEntity } from './abstract.base-entity';
import { Entity, IEntityProps } from "./abstract.entity";
import { Interaction, ACTION, Interactive } from './interaction';

interface ICellProps extends IEntityProps {
  obstacles: IObstacle[];
}

export class Cell extends Entity {

  constructor(game: Game, props: ICellProps) {
    super(game, props);
    for (const obstacle of props.obstacles) {
      const obstacleTexture = this.game.loader.getTile(obstacle.tile.path);
      const obstacleSprite = new Sprite(obstacleTexture);
      this.object.addChild(obstacleSprite);
    }
  }

}
