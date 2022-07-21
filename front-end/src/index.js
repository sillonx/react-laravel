import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CookiesProvider } from 'react-cookie';

import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';

import CssBaseline from '@mui/material/CssBaseline';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <CookiesProvider>
      <AuthProvider>
        <CssBaseline/ >
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </CookiesProvider>
  </BrowserRouter>
);
