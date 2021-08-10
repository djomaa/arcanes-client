import * as SClient from 'socket.io-client';
import { Position } from '../game/helpers/position.class';
import { IMapData } from './socket.types';

enum PLAYER_EVENT {
  MAP = 'MAP',
}

interface IResultSuccess<T> {
  status: 'SUCCESS';
  result: T;
}

interface IResultError {
  status: 'ERROR',
  error: {
    name: string;
    message: string;
    details?: Record<string, string>;
  }
}

type IResult<T = any> = IResultSuccess<T> | IResultError;

export type MapData = [];

const URL = 'ws://localhost:4001';

export class Socket {
  o: SClient.Socket;

  get connected() {
    return this.o ? this.o.connected : false;
  }

  constructor(token: string) {
    this.o = SClient.io(URL, { auth: { token } });

  }

  // disconnect - used when unmounting
  public disconnect(): void {
    this.o.disconnect();
  }

  getMap() {
    return this.request<IMapData>(PLAYER_EVENT.MAP);
  }

  getAssets() {
    return this.request<{ path: string }[]>('ASSETS');
  }

  move(position: Position) {
    console.log('SEND MOVE');
    return this.o.emit('MOVE', position.prepare(), (result: any) => console.log('MOVE RESULT', result));
  }

  private request<T>(event: string): Promise<T> {
    return new Promise((resolve, reject) => this.o.emit(event, (result: IResult<T>) => {
      if (result.status === 'SUCCESS') {
        resolve(result.result);
      } else {
        reject(result.error);
      }
    }));
  }

}

export const socket = new Socket('0x111');
