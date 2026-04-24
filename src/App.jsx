import { BrowserRouter } from 'react-router-dom';
import PublicRouter from './router/PublicRouter';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <PublicRouter />
    </BrowserRouter>
  );
}

export default App
