import { Application } from "pixi.js";

export function resize(app: Application) {
  const vpw = window.innerWidth;
  const vph = window.innerHeight;// + 1000;
  let nvw;
  let nvh;

  const height: number = window.innerHeight;
  const width: number = window.innerWidth;
  if (vph / vpw < height / width) {
    nvh = vph;
    nvw = (nvh * width) / height;
  } else {
    nvw = vpw;
    nvh = (nvw * height) / width;
  }

  console.log('resize', nvw, nvh)

  app.renderer.resize(nvw, nvh);

  const wid: number = window.innerWidth;
  const hei: number = window.innerHeight;
  app.stage.scale.set(nvw / wid, nvh / hei);
}
