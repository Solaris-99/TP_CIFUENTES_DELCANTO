import logoFull from '@/assets/images/logo-full.svg';
import { Box, Typography } from '@mui/material';
import LoginForm from 'features/auth/components/LoginForm';
import type { FC } from 'react';
import { useNavigate } from 'react-router';

const Login: FC = () => {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				maxWidth: 400,
				mx: 'auto',
				mt: 5,
				p: 3,
				borderRadius: 2,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					mb: 3,
				}}
			>
				<img src={logoFull} alt='Pasos logo' />
			</Box>
			<Typography variant='h4' component='h1' textAlign='center' gutterBottom>
				Iniciar Sesión
			</Typography>

			<LoginForm onSubmitSuccess={() => navigate('/')} />

			<Typography variant='body2' textAlign='center' sx={{ mt: 3 }}>
				<a href='.' style={{ textDecoration: 'none', color: '#1976d2' }}>
					¿Olvidaste tu contraseña?
				</a>
			</Typography>
		</Box>
	);
};

export default Login;
