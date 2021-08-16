import { OutlineFilter } from '@pixi/filter-outline';
import { Spine } from 'pixi-spine';
import { BLEND_MODES, Container, Filter, filters, Mesh, Program, Shader, Sprite, Texture } from 'pixi.js';
import { ISpine } from '../../../services/socket.types';
import { Game } from '../../game';
import { createTexture } from '../../helpers/draw.helper';
import { Position } from '../../helpers/position.class';
// import { frag } from './bg.frag';
import { fragment, uniforms, vert } from './bg.shader';

export class GameView {

  stage = new Container();
  bgStage = new Container();
  heroStage = new Container();

  constructor(
    public game: Game,
    protected resolution: Position,
  ) {
    // const bgTexture = createTexture(0x94524d, this.game.app, resolution);
    // const bg = new Sprite(bgTexture);
    // bg.width = resolution.x;
    // bg.height = resolution.y;
    this.bg();
    this.hero();
    // this.heroStage.filterArea.
    // this.heroStage.filters = [new filters.OutlineFilter(2, 0xFF0000)];
    this.stage.addChild(this.bgStage);
    this.stage.addChild(this.heroStage);
    
  }

  filter!: Filter;
  bg() {
    // const dUniforms = uniforms(this.resolution);
    // this.filter = new Filter(vert, fragment, dUniforms);
    // this.filter = new Filter(undefined, frag, { customUniform: 0.0 });
    const bgSprite = new Sprite(Texture.WHITE);
    // const bgTexture = this.game.loader.getTile('/assets/view-bg.png')
    // const bgSprite = new Sprite(bgTexture);
    bgSprite.width = this.resolution.x;
    bgSprite.height = this.resolution.y;
    // this.bgStage.addChild(bgSprite);
    // this.bgStage.filters = [this.filter];
    // this.game.app.ticker.add(this.animate.bind(this));
  }

  hero() {
    const texture = this.game.loader.getTile('/assets/view-portal.png');
    const sprite = new Sprite(texture);
    sprite.scale.set(0.5)
    sprite.position.x = (this.resolution.x - sprite.width) / 2;
    sprite.position.y = this.resolution.y / 2;
    // sprite.width = texture.width / 2;
    // sprite.height = texture.height/ 2;
    this.heroStage.addChild(sprite);
  }

  count = 0;
  animate(delta: number) {
    this.filter.uniforms.u_time += delta * 0.01;
  }

  update({ skin, path }: ISpine) {
    // return;
    const spineData = this.game.loader.getSpine(path);
    console.log('spine', path, spineData);
    const goblin = new Spine(spineData);

    // goblin.x = (this.resolution.x - goblin.width) / 2;
    console.log(this.resolution.x, this.heroStage.width, goblin.width)
    console.log(this.resolution.x / 2 + goblin.width);
    goblin.x = this.resolution.x / 2 ;
    goblin.y = this.resolution.y / 2 + this.heroStage.height * 4/5;

    goblin.scale.set(2);
    goblin.state.setAnimation(0, 'walk', true);

    goblin.skeleton.setSkinByName(skin);
    goblin.skeleton.setSlotsToSetupPose();

    this.stage.addChild(goblin);

  }

}
