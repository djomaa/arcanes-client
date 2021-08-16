import { Application } from "pixi.js";
import { SPRITE_SIZE } from '../../config';
import { Position } from './position.class';

function scale(spritesCount: number, resolution: number) {
  let scale = 1;
  const spriteSize = () => scale * SPRITE_SIZE;
  const resolutionSpriteSize = resolution / spritesCount;
  while (spriteSize() > resolutionSpriteSize) {
    scale -= 0.01;
  }
  return scale;
}

export function squareScale(size: Position, resolution: Position) {
  const xScale = scale(size.x, resolution.x);
  const yScale = scale(size.y, resolution.y);
  return Math.min(xScale, yScale);
}

export function resize(app: Application) {
  const vpw = window.innerWidth;
  const vph = window.innerHeight;// + 1000;
  let nvw;
  let nvh;

  const height: number = window.innerHeight;
  const width: number = window.innerWidth;
  if (vph / vpw < height / width) {
    nvh = vph;
    nvw = (nvh * width) / height;
  } else {
    nvw = vpw;
    nvh = (nvw * height) / width;
  }

  console.log('resize', nvw, nvh)

  app.renderer.resize(vpw, vph);

  const wid: number = window.innerWidth;
  const hei: number = window.innerHeight;
  const SIZE = {
    X: 7,
    Y: 9,
  };
  const scaleX = scale(SIZE.X, width);
  const scaleY = scale(SIZE.Y, height);
  console.log(scaleX, scaleY);
  app.stage.scale.set(Math.min(scaleX, scaleY));
}
