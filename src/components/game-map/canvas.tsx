import { useEffect, useRef, useState } from "react";
import { MapData, socket } from '../../services/socket.service';
import { CELL_SIZE } from "../../constants/map.constants";
import { IMapData } from "../../services/types";
import { Header } from 'semantic-ui-react';
import { TileLoader } from "../../services/asset.manager";
import useAsyncEffect from "use-async-effect";

interface IProps {
  data: IMapData;
}

export const Canvas: React.FC<IProps> = ({ data }) => {
  const { size, matrix } = data;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tilesLoaded, setTilesLoaded] = useState(false);
  useAsyncEffect(async () => {
    console.log(matrix);
    await Promise.all(matrix.map((element) => {
      const path = element.cell.tile.path;
      return TileLoader.load(path);
    }));
    setTilesLoaded(true);
  }, [matrix]);
  // const sizeX = map.map.length;
  // const sizeY = sizeX;

  const draw = (ctx: CanvasRenderingContext2D) => {
    for (const element of matrix) {
      const [px, py] = element.position;
      const s = { x: size[0], y: size[1] };
      const p = { x: px, y: py}
      const x = p.x;
      const y = s.x - p.y - 1;
      console.log(p, { x, y});
      console.log('element.cell.tile.path', element.cell.tile.path);
      console.log('tiles loaded', tilesLoaded)
      const tile = TileLoader.get(element.cell.tile.path);
      ctx.drawImage(
        tile,
        x * CELL_SIZE,
        y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE,
      );
    }
  }
  // for (let x = 0; x < map.length; x++) {
  //     for (let y = 0; y < map[x].length; y++) {
  //         const tile = TileLoader.get('floor');
  //         ctx.drawImage(
  //             tile,
  //             x * CELL_SIZE,
  //             y * CELL_SIZE,
  //             CELL_SIZE,
  //             CELL_SIZE,
  //         );
  // if (map[x][y]) {
  //     ctx.drawImage(
  //         Loader.get('cat'),
  //         x * CELL_SIZE + CELL_SIZE/2 - CELL_SIZE/4,
  //         y * CELL_SIZE + CELL_SIZE/2 - CELL_SIZE/4,
  //         CELL_SIZE / 2,
  //         CELL_SIZE / 2,
  //     )
  // }
  // if (x === 0) {
  //     let tile = Loader.get(`wall-${'left'}`);
  //     ctx.drawImage(
  //         tile,
  //         0,
  //         y * CELL_SIZE,
  //         CELL_SIZE,
  //         CELL_SIZE,
  //     );
  // } else if (x === map.length - 1) {
  //     let tile = Loader.get(`wall-${'right'}`);
  //     ctx.drawImage(
  //         tile,
  //         (map.length -1) * CELL_SIZE,
  //         y * CELL_SIZE,
  //         CELL_SIZE,
  //         CELL_SIZE,
  //     );
  // }
  // if (y === 0) {
  //     let tile = Loader.get(`wall-${'up'}`);
  //     ctx.drawImage(
  //         tile,
  //         x * CELL_SIZE,
  //         0,
  //         CELL_SIZE,
  //         CELL_SIZE,
  //     );
  // } else if (y === map[x].length - 1) {
  //     let tile = Loader.get(`wall-${'down'}`);
  //     ctx.drawImage(
  //         tile,
  //         x * CELL_SIZE,
  //         (map[x].length -1) * CELL_SIZE,
  //         CELL_SIZE,
  //         CELL_SIZE,
  //     );
  // }
  //     }
  // }
  // for (const obstacle of obstacles) {
  //     let tile = Loader.get(`wall-${obstacle.direction}`);
  //     const { x, y } = obstacle.position;
  //     ctx.drawImage(
  //         tile,
  //         x * CELL_SIZE,
  //         y * CELL_SIZE,
  //         CELL_SIZE,
  //         CELL_SIZE,
  //     );
  // }
  // }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && tilesLoaded) draw(ctx);
  }, [data, tilesLoaded])

  return (
    <>
      <Header>Game Map</Header>
      <canvas ref={canvasRef} height={size[0] * CELL_SIZE} width={size[1] * CELL_SIZE} id="map" />
    </>
  );
}
