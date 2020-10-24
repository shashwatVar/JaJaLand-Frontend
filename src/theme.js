import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#E91E63',
            dark: '#C2185B',
            light: '#F8BBD0',
        },
        secondary: {
            main: '#03A9F4',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(0, 0, 0, 0.85)',
        },
    },
    typography: {
        fontFamily: ['Roboto'].join(','),
    },
});