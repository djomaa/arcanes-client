import { Container, RenderTexture, Sprite } from 'pixi.js';
import { IObstacle, ITile } from '../../services/socket.types';
import { Game } from '../game';
import { BaseEntity } from './abstract.base-entity';
import { Entity, IEntityProps } from "./abstract.entity";
import { Interaction, ACTION, Interactive } from './interaction';

interface ICellProps extends IEntityProps {
  obstacles: IObstacle[];
}

@Interactive
export class Cell extends BaseEntity<ICellProps, Container> {

  createObject() {
    const cellTexture = this.game.loader.get(this.props.tile.path);

    const cell = new Sprite(cellTexture);
    cell.addChild(cell);
    for (const obstacle of this.props.obstacles) {
      const obstacleTexture = this.game.loader.get(obstacle.tile.path);
      const obstacleSprite = new Sprite(obstacleTexture);
      cell.addChild(obstacleSprite);
    }
    return cell;
  }

  @Interaction(ACTION.MOUSE_OVER)
  onMouseOver() {
    this.object.alpha = 0.5;
  }

  @Interaction(ACTION.MOUSE_OUT)
  onMouseOut() {
    this.object.alpha = 1;
  }

  @Interaction(ACTION.CLICK)
  onClick() {
    this.game.socket.move(this.position);
  }

}
