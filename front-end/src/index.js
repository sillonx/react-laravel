import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CookiesProvider } from 'react-cookie';

import './index.css';
import App from './App';

import CssBaseline from '@mui/material/CssBaseline';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <CookiesProvider>
      <CssBaseline/ >
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </CookiesProvider>
  </BrowserRouter>
);
