import { Container, Sprite } from 'pixi.js';
import { AssetLoader } from '../../../services/loader.service';
import { IMapData, IPlayerData } from '../../../services/socket.types';
import { Cell, Player } from '../../entities';
import { BaseEntity } from '../../entities/abstract.base-entity';
import { Game } from '../../game';

export class GameMap {
  
  stage = new Container();
  loader = new AssetLoader()

  constructor(
    public game: Game,
  ) {
    this.game.app.stage.addChild(this.stage);
  }

  updateMatrix({ size, cellsData }: IMapData) {
    for (const cellData of cellsData) {
      const obj = new Cell(this.game, cellData);
      this.add(obj);
    };
  }

  updatePlayers(playersData: IPlayerData[]) {
    for (const playerData of playersData) {
      const player = new Player(this.game, playerData);
      this.add(player);
    }
  }

  add(obj: BaseEntity) {
    this.stage.addChild(obj.object);
    // this.game.app.stage.addChild(obj.sprite)
  }

}
