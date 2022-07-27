import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from '@mui/material/styles';

import { useCookies } from 'react-cookie'

import MyRoutes from './routes/index';
import Header from './pages/layouts/headers';
import Footer from './pages/layouts/footers';

import LightTheme from './themes/Light';
import DarkTheme from './themes/Dark';

export default function App() {
    const [cookies] = useCookies(['mode']);
    return (
        <ThemeProvider theme={cookies.mode === 'dark' ? DarkTheme : LightTheme}>
            <CssBaseline/>
            <Header/>
            <MyRoutes/>
            <Footer/>
        </ThemeProvider>
    );
}