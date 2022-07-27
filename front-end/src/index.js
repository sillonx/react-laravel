import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import { CookiesProvider } from 'react-cookie';

import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <CookiesProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  </Provider>
);
