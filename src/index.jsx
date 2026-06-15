import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ColorProvider } from './context';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ColorProvider>
        <App />
      </ColorProvider>
    </BrowserRouter>
  </StrictMode>
);
