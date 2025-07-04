import logoFull from '@/assets/images/pasos_full.png';
import { Box, Paper, Typography } from '@mui/material';
import LoginForm from 'features/auth/components/LoginForm';
import type { FC } from 'react';
import { useNavigate } from 'react-router';

const Login: FC = () => {
	const navigate = useNavigate();

	return (
		<Paper
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
				<img src={logoFull} alt='Pasos logo' width={300} />
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
		</Paper>
	);
};

export default Login;
