import { useReducer, useEffect } from 'react';
import Board from './components/Board';
import Navbar from './components/Navbar';
import { BoardProvider } from './contexts/BoardProvider';
import { boardInitialState, boardReducer } from './reducers/boardReducer';
import M from 'materialize-css';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';


const App = () => {
  const [ state, dispatch ] = useReducer(boardReducer, boardInitialState);

  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <div className="app-container">
    <BoardProvider value={{ state, dispatch }}>
      <Navbar/>
      <Board/>
    </BoardProvider>
    </div>
  );
}

export default App;
