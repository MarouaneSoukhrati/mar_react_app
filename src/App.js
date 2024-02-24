import logo from './logo.svg';
import './App.css';
import Game from './Addons/tictactoe';
import Mybox from './Addons/mylist';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Tic-Tac-Toe Game.
        </p>
        <a
          className="App-link"
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn To code
        </a>
        <Game/>
        <Mybox/>
      </header>
    </div>
  );
}

export default App;
