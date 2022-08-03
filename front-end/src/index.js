import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider as ReduxProvider } from 'react-redux';
import store from './store';

import { CookiesProvider } from 'react-cookie';

import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </ReduxProvider>
);
