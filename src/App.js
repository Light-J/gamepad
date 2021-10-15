import logo from './logo.svg';
import './App.css';
import GameContainer from './containers/GameContainer';
import { GamepadsProvider } from 'react-gamepads';

function App() {
  return (
    <div className="App">
      <body className="App-header">
        <p>Jacks cube innit</p>
        <GamepadsProvider>
          <GameContainer />
        </GamepadsProvider>
      </body>
    </div>
  );
}

export default App;
