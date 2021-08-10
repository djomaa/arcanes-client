import { Application } from 'pixi.js';
import { socket } from './services/socket.service';
import { Game } from './game';

const game = new Game(socket);

socket.o.once('connect', async () => {
  const assets = await socket.getAssets();
  game.loader.tiles(assets);
  await game.loader.ready();
  const map = await socket.getMap();
  game.map.updateMatrix(map);
})
