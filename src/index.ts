import { AUTH_KEY, socket } from './services/socket.service';
import { Game } from './game';
import './index.css';
import { AssetLoader } from './services/loader.service';
import { Battle } from './game/components/battle/battle.component';
import { Position } from './game/helpers/position.class';

socket.o.once('connect', async () => {

  localStorage.setItem(AUTH_KEY, socket.token);

  const assets = await socket.getAssets();
  const spines = await socket.getSpines();
  console.log('spines1', assets)
  AssetLoader.tiles(assets);
  AssetLoader.spines(spines)
  await AssetLoader.ready();
  const game = new Game(socket);
  

  const battle = new Battle(game, new Position(game.app.view.width, game.app.view.height));
  battle.init(spines[0]);

  // EngineAdapter.instance = new PixiAdapter({ renderer: game.app.renderer as any, nativeStage: game.app.stage as any })

  // const map = await socket.getMap();
  // game.map.updateMatrix(map);

  // const moves = await socket.getPossibleMoves();
  // game.map.updatePossibleMoves(moves);

  // const players = await socket.getPlayers();
  // game.map.updatePlayers(players);

  // socket.o.on('PLAYERS_UPDATED', (players: any) => {
  //   console.log('UPD', players);
  //   game.map.updatePlayers(players);
  // })
  // game.gameView.update(spines[0]);
})
