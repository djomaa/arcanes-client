import { Application, Graphics } from 'pixi.js';
import { Position, PositionLike } from './position.class';

export function createTexture(color: number, app: Application, size: PositionLike) {
  size = new Position(size);
  const graphics = new Graphics()
        .beginFill(color)
        // .lineStyle(5, 5093036)
        .drawRect(0, 0, size.x, size.y)
        .endFill();
  return app.renderer.generateTexture(graphics);
}
