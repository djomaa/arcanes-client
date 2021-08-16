import { Loader } from '@pixi/loaders';
import { Texture } from 'pixi.js';
import { Game } from '../game';
import { API_URL } from '../config';
import { ISpine, ITile } from './socket.types';
import { SpineParser } from 'pixi-spine';

class LoadError extends Error {
  constructor(
    readonly asset: string,
    message: string,
  ) {
    super(message);
  }
}

export class CAssetLoader {

  loader = Loader.shared;
  keys = new Set<string>();

  constructor() {
    // this.loader = game.app.loader;
    Loader.registerPlugin(SpineParser);
  }
  // constructor() {
  //   super();
  //   this.loader.pre((resource) => {
  //     if 
  //   });
  // }

  tiles(tiles: ITile[]) {
    for (const tile of tiles) {
      this.loader.add(tile.path, API_URL + tile.path);
    }
  }

  spines(spines: ISpine[]) {
    for (const spine of spines) {
      console.log('add spine', spine)
      // this.loader.add(spine.path + '/image', API_URL + spine.path + '/spine.png');
      // this.loader.add(spine.path + '/json', API_URL + spine.path + '/spine.json');
      // this.loader.add(spine.path + '/atlas', API_URL + spine.path + '/spine.atlas');
      this.loader.add(spine.path, API_URL + spine.path + '/spine.json');
    }
  }

  async ready() {
    console.log(this.loader);
    return new Promise<void>((resolve) => {
      this.loader.load((...args) => {
        console.log('done', ...args);
        resolve();
      });
    })
  }

  getSpine(key: string) {
    const data = this._get(key);
    // console.log('get spine', key, data)
    return data.spineData!;
  }

  getTile(key: string) {
    // console.log(this.loader.resources)
    const asset = this._get(key);
    return asset.texture!;
  }

  _get(key: string) {
    // console.log(key, this.resources);
    if (!this.loader.resources[key]) {
      console.log(key);
      throw new LoadError(key, 'UNKNOWN_ASSET');
    }
    if (!this.loader.resources[key].isComplete) {
      console.log(key);
      throw new LoadError(key, 'NOT_LOADED');
    }
    return this.loader.resources[key];
  }

}

export const AssetLoader = new CAssetLoader();
