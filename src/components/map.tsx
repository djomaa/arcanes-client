import { useEffect, useRef, useState } from "react";
import { SocketService } from '../services/socket.service';
import { Loader } from '../asset.manager';
import './map.css';
import { CELL_SIZE } from "../constants/map.constants";

const mock = {
    "obstacles":[
       {
          "type":"wall",
          "position":{
             "x":0,
             "y":0,
             "iterable":[
                0,
                0
             ]
          },
          "direction":"down"
       },
       {
          "type":"wall",
          "position":{
             "x":0,
             "y":1,
             "iterable":[
                0,
                1
             ]
          },
          "direction":"up"
       },
       {
          "type":"wall",
          "position":{
             "x":1,
             "y":0,
             "iterable":[
                1,
                0
             ]
          },
          "direction":"right"
       },
       {
          "type":"wall",
          "position":{
             "x":2,
             "y":0,
             "iterable":[
                2,
                0
             ]
          },
          "direction":"left"
       },
       {
          "type":"wall",
          "position":{
             "x":0,
             "y":1,
             "iterable":[
                0,
                1
             ]
          },
          "direction":"down"
       },
       {
          "type":"wall",
          "position":{
             "x":0,
             "y":2,
             "iterable":[
                0,
                2
             ]
          },
          "direction":"up"
       },
       {
          "type":"wall",
          "position":{
             "x":1,
             "y":1,
             "iterable":[
                1,
                1
             ]
          },
          "direction":"right"
       },
       {
          "type":"wall",
          "position":{
             "x":2,
             "y":1,
             "iterable":[
                2,
                1
             ]
          },
          "direction":"left"
       }
    ],
    "map":[
       [
          null,
          {
             "type":"player",
             "id":0,
             "position":{
                "x":0,
                "y":1,
                "iterable":[
                   0,
                   1
                ]
             }
          },
          null
       ],
       [
          {
             "type":"player",
             "id":1,
             "position":{
                "x":1,
                "y":0,
                "iterable":[
                   1,
                   0
                ]
             }
          },
          null,
          null
       ],
       [
          null,
          null,
          null
       ]
    ]
 };

export function Map() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [map, setMap] = useState<any>(mock);
    const sizeX = map.map.length;
    const sizeY = sizeX;
    const draw = (ctx: CanvasRenderingContext2D, { map, obstacles }: any) => {
        for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map[x].length; y++) {
                const tile = Loader.get('floor');
                ctx.drawImage(
                    tile,
                    x * CELL_SIZE,
                    y * CELL_SIZE,
                    CELL_SIZE,
                    CELL_SIZE,
                );
                if (map[x][y]) {
                    ctx.drawImage(
                        Loader.get('cat'),
                        x * CELL_SIZE + CELL_SIZE/2 - CELL_SIZE/4,
                        y * CELL_SIZE + CELL_SIZE/2 - CELL_SIZE/4,
                        CELL_SIZE / 2,
                        CELL_SIZE / 2,
                    )
                }
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
            }
        }
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
    }

    useEffect(() => {
        SocketService.socket.on('MAP', (map: any[][]) => {
            console.log(map);
            setMap(map);
        });
        SocketService.socket.emit('MAP GET');
      console.log(map);
      const canvas = canvasRef.current;
    //   canvas?.width = CELL_SIZE * sizeX;
    //   canvas?.height = CELL_SIZE * sizeY;
      const ctx = canvas?.getContext('2d');
      if (ctx) draw(ctx, map);
    }, []);

    return (
        <div>
            Map:
            <canvas ref={canvasRef} height={sizeY * CELL_SIZE} width={sizeX * CELL_SIZE}id="map" />
        </div>
    );
}
