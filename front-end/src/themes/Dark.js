import { createTheme } from '@mui/material/styles';

const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        common: {
            black : '#000000',
            white : '#FFFFFF'
        },
        primary: {
            main: '#167BDF'
        },
        secondary: {
            main: '#A629E4'
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
            primary: '#ffffff',
            secondary: 'rgba(255,255,255,0.6)'
        },
        background: {
            default: '#353535',
            paper: '#353535'
        }
    },
    typography: {
        fontFamily: 'Arial',
        fontSize: 14
    },
    components: {
        MuiMenu: {
            styleOverrides: {
                root: {
                    color: '#F15'
                }
            }
        }
    }
})

export default DarkTheme;