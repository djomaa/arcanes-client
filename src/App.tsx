import { useEffect, useState } from 'react';
import { GameEngine } from './components/game.engine';
import { SocketService } from './services/socket.service';
import './asset.manager';
function App() {

  const [connected, setConnected] = useState(SocketService.socket.connected);

  useEffect(() => {
    SocketService.socket.on('connect', () => setConnected(true));
    SocketService.socket.on('disconnect', () => setConnected(false));
  }, []);

  return (
    <div>
      {connected ? <GameEngine /> : 'Connection...'}
    </div>
  );

}

export default App;
