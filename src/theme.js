import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
	palette: {
		type: 'light',
		/* background: {
			default: '#282727',
		}, */
		primary: {
			main: '#E91E63',
			dark: '#C2185B',
			light: '#F8BBD0',
		},
		secondary: {
			main: '#03A9F4',
		},
		text: {
			primary: 'rgba(0,0,0,0.85)',
			secondary: 'white',
		},
	},
	typography: {
		fontFamily: ['Roboto'].join(','),
	},
});
