import { useEffect, useState } from 'react';
import { GameEngine } from '../../components/game.engine';
import { socket } from '../../services/socket.service';
import { Container, Loader } from 'semantic-ui-react';
import { GameMap } from '../../components/game-map';
function App() {

  const [connected, setConnected] = useState(socket.connected);
  
  useEffect(() => {
    socket.o.on('connect', () => setConnected(true));
    socket.o.on('disconnect', () => setConnected(false));
  }, []);

  return (
    <Container style={{ marginTop: '20px', width: '900px' }}>
        Connect: {connected.toString()}
        {connected ? <GameMap /> : <Loader active={true} />}
    </Container>
  );

}

export default App;
