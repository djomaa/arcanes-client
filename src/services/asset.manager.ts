// import Tile01 from './assets/tiles/tile01.png'
// console.log(Tile01);
const url = 'http://localhost:4001'

class AssetManager {
    images: Record<string, HTMLImageElement> = {};
    private promises: Promise<HTMLImageElement>[] = [];

    m: Record<string, Promise<HTMLImageElement> | HTMLImageElement> = {};

    load(path: string) {
      const fPath = url + path;
      const img = new Image();
      if (this.m[path]) return this.m[path];
      const promise = new Promise<HTMLImageElement>((resolve, reject) => {
          img.onload = () => {
              this.m[path] = img;
              this.images[path] = img;
              console.log('load', path)
              resolve(img);
          };
          img.onerror = (error) => {
              console.error('Cannot load image', path, path);
              console.error(error);
              reject('unable to load image');
          };
          img.src = fPath;
      });
      this.m[path] = promise;
      this.promises.push(promise);
      return promise;
      // return img;
    }

    loaded() {
        return Promise.all(this.promises);
    }

    get(key: string) {
        console.log(this.images)
        const result = this.images[key];
        if (!result) throw new Error(`no img found for ${key}`);
        return result;
    // }

    // get(path: string) {
    //   const result = this.images[path];
    //   return result ?? this.load(path);
      // if (!path) {
      //   return this.load(path);
      // }

    }

}

export const TileLoader = new AssetManager();
// Loader.load('1', './assets/tiles/tile01.png');
// // Loader.load('floor', './assets/tiles/tile13.png')
// // Loader.load('floor', './assets/tiles/tile14.png')
// // Loader.load('floor', './assets/tiles/tile15.png')
// // Loader.load('floor', './assets/tiles/tile16.png')
// // Loader.load('floor', './assets/tiles/tile17.png')
// Loader.load('floor', './assets/tiles/tile18.png')
// // Loader.load('floor', './assets/tiles/tile19.png')
// // Loader.load('floor', './assets/tiles/tile20.png')
// Loader.load('wall-left', './assets/tiles/tile05.png')
// Loader.load('wall-right', './assets/tiles/tile04.png')
// Loader.load('wall-up', './assets/tiles/tile08.png')
// Loader.load('wall-down', './assets/tiles/wall-down.png')
// Loader.load('cat', './assets/tiles/cat-icon-64-64.png')

export function randomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
