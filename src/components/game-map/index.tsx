import { useEffect, useRef, useState } from "react";
import { MapData, socket } from '../../services/socket.service';
import { useAsyncEffect } from 'use-async-effect';
import { Loader } from "semantic-ui-react";
import { Canvas } from "./canvas";
import { IMapData } from "../../services/types";

export function GameMap() {
  const [mapData, setMapData] = useState<IMapData>();
  useAsyncEffect(async () => {
    const data = await socket.getMap();
    console.log('data', data);
    setMapData(data);
  }, [])

  return (
    <>
      {mapData ? <Canvas data={mapData} /> : <Loader active={true} />}
    </>
  );
}
