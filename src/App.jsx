import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Personas from './pages/private/Personas/Personas';

function App() {
  return (
    // Sin este BrowserRouter, la pantalla saldrá en blanco si hay NavLinks
    <BrowserRouter>
      <Personas />
    </BrowserRouter>
  );
}

export default App;