import { io, Socket } from 'socket.io-client';

class CSocketService {
  socket: Socket = {} as Socket;

  constructor(readonly url: string) {

  }

  public connect (hash: string) {
    this.socket = io(this.url, { auth: { hash } });
  }

  // disconnect - used when unmounting
  public disconnect (): void {
    this.socket.disconnect();
  }
}

export const SocketService = new CSocketService('localhost:4001');
SocketService.connect('qwe1');
