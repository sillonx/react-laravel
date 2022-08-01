import { createTheme } from '@mui/material/styles';

const LightTheme = createTheme({
    palette: {
        mode: 'light',
        common: {
            black : '#000000',
            white : '#FFFFFF'
        },
        primary: {
            main: '#167BDF'
        },
        secondary: {
            main: '#9316DF'
        },
        error: {
            main: '#ED1616'
          },
        warning: {
            main: '#FF9E1B'
        },
        info: {
            main: '#1DDBE9'
        },
        success: {
            main: '#57DA23'
        },
        text: {
            primary: '#000000',
            secondary: 'rgba(0,0,0,0.6)'
        },
        background: {
            default: '#FFFFFF',
            paper: '#FFFFFF'
        },
        link: {
            main: '#2C3EF2',
            visited: '#9B1FD8'
        }
    },
    typography: {
        fontFamily: 'Arial',
        fontSize: 14
    }
})

export default LightTheme;