import { Loader } from '@pixi/loaders';
import { Texture } from 'pixi.js';
import { API_URL } from '../game/config';
import { ITile } from './socket.types';

class LoadError extends Error {
  constructor(
    readonly asset: string,
    message: string,
  ) {
    super(message);  
  }
}

export class AssetLoader extends Loader {
  
  loader = new Loader(API_URL);
  keys = new Set<string>();

  // constructor() {
  //   super();
  //   this.loader.pre((resource) => {
  //     if 
  //   });
  // }

  tiles(tiles: ITile[]) {
    for (const tile of tiles) {
      this.add(tile.path, API_URL + tile.path);
    }
  }

  async ready() {
    console.log(this.loader);
    return new Promise<void>((resolve) => {
      this.load(() => { console.log('done'); resolve() });
    })
  }

  get(key: string) {
    console.log(key, this.resources);
    if (!this.resources[key]) {
      throw new LoadError(key, 'UNKNOWN_ASSET');
    }
    if (!this.resources[key].texture) {
      throw new LoadError(key, 'NOT_LOADED');
    }
    return this.resources[key].texture!;
  }

  

}
