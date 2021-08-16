import { Application, Texture } from "pixi.js";
import { IMapData, IMatrixElement } from "../services/socket.types";
import { Player, Entity, Cell } from "./entities";
import { resize } from "./helpers/resize.helper";
import { Socket } from '../services/socket.service';
import { GameMap } from './components/map/map.component';
import { AssetLoader, CAssetLoader } from '../services/loader.service';
import { Battle } from './components/battle/battle.component';
import { Spine } from 'pixi-spine';
import { Position } from './helpers/position.class';

function log(...args: any[]) {
  console.log(...args);
}

export class Game {
  app: Application;
  map: GameMap;
  loader: CAssetLoader;
  gameView: Battle;

  constructor(
    public socket: Socket,
  ) {
    this.app = new Application({
      antialias: true,
      backgroundColor: 0x000000,
      resolution: devicePixelRatio,
    });
    resize(this.app);
    document.body.appendChild(this.app.view);

    const mapResolution = new Position(
      Math.floor(this.app.view.width / 2),
      this.app.view.height,
    );
    this.loader = AssetLoader;
    this.map = new GameMap(this, mapResolution);
    this.gameView = new Battle(this, mapResolution);
    

    this.app.stage.addChild(this.gameView.stage);

    console.log('this.app.view.width', this.app.view.width);
    this.map.stage.position.set(this.app.view.width / 2, 0);
    this.app.stage.addChild(this.map.stage);


    window.addEventListener('resize', () => resize(this.app));
  }

  async move(position: Position) {
    const possibleMoves = await this.socket.move(position);
    this.map.updatePossibleMoves(possibleMoves);
  }

}


