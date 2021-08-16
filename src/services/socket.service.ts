import * as SClient from 'socket.io-client';
import { Position } from '../game/helpers/position.class';
import { IMapData, IPlayer, ISpine, PosTuple } from './socket.types';
import { API } from '../config';


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

const URL = `ws${API.SECURE ? 's' : ''}://${API.HOST}:${API.PORT}`;

export class Socket {
  o: SClient.Socket;

  get connected() {
    return this.o ? this.o.connected : false;
  }

  constructor(public token: string) {
    this.o = SClient.io(URL, { auth: { token } });

  }

  // disconnect - used when unmounting
  public disconnect(): void {
    this.o.disconnect();
  }

  getMap() {
    return this.request<IMapData>(PLAYER_EVENT.MAP);
  }


  getPlayers() {
    return this.request<IPlayer[]>('PLAYERS');
  }

  getAssets() {
    return this.request<{ path: string }[]>('ASSETS');
  }

  getSpines() {
    return this.request<ISpine[]>('SPINES');
  }

  async getPossibleMoves() {
    const moves = await this.request<PosTuple[]>('POSSIBLE_MOVES');
    return moves.map((pos) => new Position(pos));
  }

  async move(position: Position) {
    const possibleMoves = await this.request<PosTuple[]>('MOVE', position.prepare());
    return possibleMoves.map((pos) => new Position(pos));
    // return this.o.emit('MOVE', position.prepare(), (result: any) => console.log('MOVE RESULT', result));
  }

  private request<T>(event: string, ...args: any[]): Promise<T> {
    return new Promise((resolve, reject) => this.o.emit(event, ...args, (result: IResult<T>) => {
      if (result.status === 'SUCCESS') {
        resolve(result.result);
      } else {
        reject(result.error);
      }
    }));
  }

}
export const AUTH_KEY = 'AUTORIZATION';
const auth = localStorage.getItem(AUTH_KEY) || prompt('Enter hash (0x111 or 0x222)')!
export const socket = new Socket(auth);
