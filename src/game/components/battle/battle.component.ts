import { Container, Graphics, Sprite, Texture } from 'pixi.js';
import { applySpine2dMixin, Container3d, Container2d, Sprite2d, AFFINE, TRANSFORM_STEP } from 'pixi-projection';
import { Game } from '../../game';
import { Position } from '../../helpers/position.class';
import { Spine } from 'pixi-spine';
import { ISpine } from '../../../services/socket.types';
import { ACTION } from '../../entities/interaction';
export function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

class henta {

  point: [number, number] = [0, 0];
  history: [number, number][] = [];

  constructor(degress: number = 0) {
    this.degress = degress
    this.radians = degress * Math.PI / 180;
  }

  radians = 0;
  degress = 0;
  move(length: number, angle: number) {
    this.degress += angle;
    const radians = angle * Math.PI / 180;
    this.radians += radians;
    console.log('sin', this.degress, Math.sin(this.radians));
    const dx = length * Math.sin(this.radians);
    const dy = length * Math.cos(this.radians);
    this.history.push(this.point);
    this.point = [
      this.point[0] + dx,
      this.point[1] - dy,
    ];
  }

}

export class Battle {

  stage = new Container();
  mapStage = new Container();
  bgStage = new Container();

  constructor(
    public game: Game,
    protected resolution: Position,
  ) {
    this.stage.sortableChildren = true;
    this.bgStage.zIndex = 0;
    this.mapStage.zIndex = 1;
    this.stage.addChild(this.bgStage);
    this.stage.addChild(this.mapStage);
    this.game.app.stage.addChild(this.stage);
  }

  init(sp: ISpine) {
    const bgTexture = this.game.loader.getTile('/assets/battle-background.png');
    const bgSprite = new Sprite(bgTexture);
    bgSprite.width = this.resolution.x;
    bgSprite.height = this.resolution.y;
    this.bgStage.addChild(bgSprite);

    const s = 60;
    const ss = new henta();
    ss.move(s, 300);
    ss.move(s, 300);
    ss.move(s, 300);
    ss.move(s, 300);
    ss.move(s, 300);
    ss.move(s, 300);
    console.log(ss.history);

    const hexagon = {
      size: 60,
      width: 60 * Math.sqrt(3),
    };

    const hg = (color: number) => {
      const graphics = new Graphics();
      graphics.beginFill(color);
      const size = 256;

      graphics.drawPolygon([...ss.history.flat()]);
      graphics.endFill();
      return this.game.app.renderer.generateTexture(graphics);
    }

    const xh = Math.sqrt(3) * s / 2;
    const yh = s;
    const oy = yh * 2 - Math.sqrt(3) * s / 2;
    const fx = xh * 0.1
    const fy = yh * 0.1;
    console.log('init', xh, yh, oy)
    const m = [];
    const tint = 0xffffff;
    let ty = 0;
    let tx = 0;
    for (let y = 0; y < 11; y += 1) {
      for (let x = 0; x < (y % 2 === 0 ? 10 : 11); x += 1) {

        const xOffset = x * xh * 2 + (y % 2 === 0 ? xh : 0);
        // const yOffset = y * oy * 2 + (x % 2 === 0 ? 0 : oy);
        const yOffset = (y) * s * 3 / 2; // ??
        const color = Number(`0x${randomInt(0, 255)}${randomInt(0, 255)}${randomInt(0, 255)}`);
        const texture = hg(0x000000);
        const hSprite = new Sprite(texture);
        console.log(x, y, xOffset, yOffset, {
          tx
        });
        hSprite.alpha = 0.2
        hSprite.interactive = true;
        hSprite.on(ACTION.MOUSE_OVER, () => hSprite.alpha = 0.5);
        hSprite.on(ACTION.MOUSE_OUT, () => hSprite.alpha = 0.2)
        hSprite.interactive = true;
        // if (x > 0) {
        tx = fx * x;
        ty = fy * y;
        hSprite.position.set(xOffset + tx, yOffset + ty);
        this.mapStage.addChild(hSprite);
      }
    }


  }

  addPlayer(spineData: ISpine) {

  }

}
/*
 console.log('reso', this.resolution);
    const count = 5;
    for (let i = 1; i <= count; i += 1) {
      const data = this.game.loader.getSpine(sp.path);
      const spine = new Spine(data);
      spine.skeleton.setSkinByName(sp.skin);
      this.stage.addChild(spine);
      spine.state.setAnimation(0, 'walk', true);

      const pos = new Position(
        100,
        this.resolution.y * (i / (count + 1)) + spine.height / 2
      );
      console.log(pos)
      spine.position.set(pos.x, pos.y);
      this.stage.addChild(spine);
    }

    for (let i = 1; i <= count; i += 1) {
      const data = this.game.loader.getSpine(sp.path);
      const spine = new Spine(data);

      spine.scale.x = -1;
      spine.skeleton.setSkinByName(sp.skin);
      spine.state.setAnimation(0, 'walk', true);
      this.stage.addChild(spine);

      console.log(this.resolution.x, spine.width)
      const pos = new Position(
        this.resolution.x + spine.width,
        this.resolution.y * (i / (count + 1))
      );
      console.log(pos)
      spine.position.set(pos.x, pos.y);
      this.stage.addChild(spine);
    }*/
