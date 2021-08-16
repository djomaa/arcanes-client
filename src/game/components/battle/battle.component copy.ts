import { Container, Sprite, Texture } from 'pixi.js';
import { Camera3d, applySpine2dMixin, Container3d, Container2d, Sprite2d, AFFINE, TRANSFORM_STEP } from 'pixi-projection';
import { Game } from '../../game';
import { Position } from '../../helpers/position.class';
import { Spine } from 'pixi-spine';
import { ISpine } from '../../../services/socket.types';

export class Battle {

  stage = new Container2d();

  constructor(
    public game: Game,
    protected resolution: Position,
  ) {
  }

  init() {
    console.log('asdasd');

    applySpine2dMixin(Spine.prototype); 
    
    this.stage = new Container2d();
    this.stage.position.set(this.game.app.screen.width / 2, this.game.app.screen.height);

    this.game.app.stage.addChild(this.stage);

    const bigWhiteTexture = new Texture(Texture.WHITE.baseTexture);
    bigWhiteTexture.orig.width = 30;
    bigWhiteTexture.orig.height = 30;

    const bgTexture = this.game.loader.getTile('/assets/battle-background.png');
    const bgSprite = new Sprite2d(bgTexture);
    bgSprite.anchor.set(0.5, 1);
    bgSprite.width = this.game.app.screen.width * 3;
    bgSprite.height = this.game.app.screen.height * 1.5;

    const squareFar = new Sprite(bigWhiteTexture);
    squareFar.tint = 0xff0000;
    // @ts-ignore
    squareFar.factor = 1;
    squareFar.anchor.set(0.5);
    squareFar.position.set(this.game.app.screen.width / 2, 50);

    const squarePlane = new Sprite2d(bigWhiteTexture);
    squarePlane.tint = 0xff0000;
    // @ts-ignore
    squarePlane.factor = 1;
    squarePlane.proj.affine = AFFINE.AXIS_X;
    squarePlane.anchor.set(0.5, 0.0);
    squarePlane.position.set(-this.game.app.screen.width / 4, -this.game.app.screen.height / 2);

    const heroTexture = this.game.loader.getTile('/assets/hero_01.png');
    const heroSprite = new Sprite(heroTexture);
    heroSprite.anchor.set(0.5, 1.0);
    this.stage.addChild(heroSprite);

    this.game.app.stage.addChild(this.stage);
    this.stage.addChild(bgSprite);
    this.stage.addChild(squarePlane);
    squarePlane.addChild(heroSprite);
    
    this.game.app.ticker.add((delta) => {
      console.log(squareFar.position);
      const pos = this.stage.toLocal(squareFar.position, undefined, undefined, undefined, TRANSFORM_STEP.BEFORE_PROJ);
      // need to invert this thing, otherwise we'll have to use scale.y=-1 which is not good
      pos.y = -pos.y;
      pos.x = -pos.x;

      // @ts-ignore
      this.stage.proj.setAxisY(pos, -squareFar.factor);
  
      // @ts-ignore
      squarePlane.proj.affine = squarePlane.factor
          ? AFFINE.AXIS_X : AFFINE.NONE;
      squarePlane.rotation += 0.1;
  });
  

  }

  addPlayer(spineData: ISpine) {
     
  }

}
