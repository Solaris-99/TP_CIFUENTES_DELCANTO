import Router from '@/components/common/Router.tsx';
import { theme } from '@/configs/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from 'context/AuthContext';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

if (!rootElement) {
	throw new Error("Root element with id 'root' not found.");
}

createRoot(rootElement).render(
	<StrictMode>
		<AuthProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router />
			</ThemeProvider>
		</AuthProvider>
	</StrictMode>
);
