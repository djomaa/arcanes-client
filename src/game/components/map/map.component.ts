import { OutlineFilter } from '@pixi/filter-outline';
import { RectTileLayer } from '@pixi/tilemap';
import { Container, Sprite, Texture } from 'pixi.js';
import { CAssetLoader } from '../../../services/loader.service';
import { IMapData, IPlayer, IPlayerData } from '../../../services/socket.types';
import { SPRITE_SIZE } from '../../../config';
import { Cell, Player } from '../../entities';
import { BaseEntity } from '../../entities/abstract.base-entity';
import { Move } from '../../entities/move.entity';
import { Game } from '../../game';
import { createTexture } from '../../helpers/draw.helper';
import { Position, PositionLike } from '../../helpers/position.class';
import { squareScale } from '../../helpers/scale.helper';

export class GameMap {
  
  stage = new Container();
  cellsStage = new Container();
  playersStage = new Container();
  cells = new Map<string, Cell>();
  movesStage = new Container();

  set scale(n: number) {
    this.cellsStage.scale.set(n);
    this.playersStage.scale.set(n);
    this.movesStage.scale.set(n);
  }

  set position(position: PositionLike) {
    const { x, y } = new Position(position);
    this.cellsStage.position.set(x, y);
    this.playersStage.position.set(x, y);
    this.movesStage.position.set(x, y);
  }

  constructor(
    public game: Game,
    protected resolution: Position,
    ) {
    // const bgTexture = createTexture(0xb9f095, this.game.app, resolution);
    // const bg = new Sprite(bgTexture);
    // this.stage.addChild(bg)
    this.stage.sortableChildren = true;
    this.cellsStage.zIndex = 0;
    this.playersStage.zIndex = 1;
    this.stage.addChild(this.playersStage);
    this.stage.addChild(this.cellsStage);
    this.stage.addChild(this.movesStage);
    // this.stage.on('childAdded', () => {
    //   bg.width = this.stage.width;
    //   bg.height = this.stage.height;
    // });
  }

  updateMatrix({ size, cellsData }: IMapData) {
    this.cellsStage.visible = false;
    console.log('size', size)
    this.scale = squareScale(new Position(size), this.resolution);
    for (const cellData of cellsData) {
      const obj = new Cell(this.game, cellData);
      const pos = new Position(cellData.position);
      this.cells.set(pos.key, obj);
      this.addCell(obj);
    };
    this.position = new Position(
      this.resolution.x / 2 - this.cellsStage.width / 2,
      this.resolution.y / 2 - this.cellsStage.height / 2,
    );
    this.cellsStage.visible = true;
  }

  updatePossibleMoves(moves: Position[]) {
    console.log('asdasd')
    this.movesStage.removeChildren();
    for (const position of moves) {
      // const sp = new Sprite(Texture.WHITE);
      // sp.alpha = 1;
      // sp.filters = [ new OutlineFilter(1, 0xff0000, 1)];
      // sp.width = SPRITE_SIZE;
      // sp.height = SPRITE_SIZE;
      // sp.position.set(move.x * SPRITE_SIZE, move.y * SPRITE_SIZE);
      // this.movesStage.addChild(sp);
      const move = new Move(this.game, {
        position,
      });
      this.movesStage.addChild(move.object);
    }
  }

  updatePlayers(playersData: IPlayer[]) {
    this.playersStage.removeChildren();
    type MM = Map<string, Map<number, IPlayer[]>>
    const grouped = playersData.reduce<MM>((map, player) => {
      const pos = new Position(player.position);
      const byPos = map.has(pos.key) ? map.get(pos.key)! : map.set(pos.key, new Map()) && map.get(pos.key)!;
      const byTeam = byPos.has(player.team.id) ? byPos.get(player.team.id)! : byPos.set(player.team.id, []) && byPos.get(player.team.id)!;
      byTeam.push(player);
      return map;
    }, new Map<string, Map<number, IPlayer[]>>());
    for (const [sPos, teams] of grouped) {
      let i = 0;
      for (const [teamId, players] of teams) {
        const player = new Player(this.game, {
          yFactor: ++i / (teams.size + 1),
          tile: players[0].team.tile,
          position: Position.fromKey(sPos),
        });
        this.playersStage.addChild(player.object);
      }
    }
  }

  addCell(obj: BaseEntity) {
    // console.log('asd', this.stage.width, this.stage.height)
    this.cellsStage.addChild(obj.object);
    // this.game.app.stage.addChild(obj.sprite)
  }

  addPlayer(obj: BaseEntity) {
    // console.log('asd', this.stage.width, this.stage.height)
    this.playersStage.addChild(obj.object);
    // this.game.app.stage.addChild(obj.sprite)
  }

}
