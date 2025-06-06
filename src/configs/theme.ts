import { createTheme } from '@mui/material';

// ed1a7bff violeta claro
// f1b634ff  amarelo
// 862c76ff violeta
//Patrick hand y baloo 2
export const theme = createTheme({
	palette: {
		primary: {
			main: '#ed1a7b',
		},
		secondary: {
			main: '#862c76',
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundImage:
						'radial-gradient(#ffcfe8 2px, transparent 2px), radial-gradient(#ffcfe8 2px, transparent 2px)',
					backgroundSize: '32px 32px',
					backgroundPosition: '0 0, 16px 16px',
					backgroundColor: '#ffffff',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: '#FFF',
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					color: '#ed1a7b',
					fontFamily: 'Patrick hand',
				},
			},
		},
	},
	typography: {
		fontFamily: ['"Patrick hand"', 'Roboto', 'Arial', 'sans-serif'].join(','),
	},
});
