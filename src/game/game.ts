import { Application, Texture } from "pixi.js";
import { IMapData, IMatrixElement } from "../services/socket.types";
import { Player, Entity, Cell } from "./entities";
import { resize } from "./helpers/resize.helper";
import { Socket } from '../services/socket.service';
import { GameMap } from './components/map/map.component';
import { AssetLoader } from '../services/loader.service';


function log(...args: any[]) {
  console.log(...args);
}

export class Game {
  app: Application;
  map: GameMap;
  loader = new AssetLoader();

  constructor(
    public socket: Socket,
  ) {
    this.app = new Application({
      antialias: true,
      backgroundColor: 0x000000,
      resolution: devicePixelRatio,
    });
    this.map = new GameMap(this);
    resize(this.app);
    window.addEventListener('resize', () => resize(this.app));
    document.body.appendChild(this.app.view);
  }



}


