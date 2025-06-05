import { createTheme } from '@mui/material';

//ed1a7bff   f1b634ff   862c76ff
//Patrick hand y baloo 2
export const theme = createTheme({
	palette: {
		primary: {
			main: '#000000',
		},
		secondary: {
			main: '#ffffff',
		},
	},
	components: {},
	typography: {
		fontFamily: [
			'Inter',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
		].join(','),
	},
});
