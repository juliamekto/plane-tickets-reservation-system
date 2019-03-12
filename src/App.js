import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter.jsx';
import './index.css';

const App = () => {
    return (
      <BrowserRouter>
          <AppRouter />
      </BrowserRouter>
  );
}

export default App;
