import { zodResolver } from '@hookform/resolvers/zod'; // Necesitas instalar esta dependencia
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { type LoginFormValues, loginSchema } from '../schemas/loginSchema'; // Importa el esquema Zod
import { loginUser } from '../services/authService';

interface LoginFormProps {
	initialValues?: LoginFormValues;
	onSubmitSuccess: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onSubmitSuccess }) => {
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	});

	const onSubmit = async (data: LoginFormValues) => {
		try {
			const response = await loginUser(data);
			console.log('Usuario logueado:', response);
			reset();
			onSubmitSuccess();
		} catch (error) {
			// TODO: Setup errors in constants
			console.error('Error al loguearse:', error);
			setError('Hubo un error al loguearse. Por favor, intenta de nuevo.');
		}
	};

	return (
		<Box
			sx={{
				maxWidth: 400,
				mx: 'auto',
				mt: 5,
				p: 3,
				borderRadius: 2,
				boxShadow: 2,
			}}
		>
			<Typography variant='h4' component='h1' textAlign='center' gutterBottom>
				Iniciar Sesión
			</Typography>

			{error && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}

			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<TextField
					label='Correo Electrónico'
					type='email'
					fullWidth
					autoComplete='email'
					margin='normal'
					{...register('email')}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>

				<TextField
					label='Contraseña'
					type='password'
					fullWidth
					autoComplete='current-password'
					margin='normal'
					{...register('password')}
					error={!!errors.password}
					helperText={errors.password?.message}
				/>

				<Button
					type='submit'
					variant='contained'
					fullWidth
					sx={{ mt: 2 }}
					/* TODO: Create a loading hook */
					/* disabled={isLoading} */
				>
					Iniciar Sesión
					{/* {isLoading ? <CircularProgress size={24} color="inherit" /> : "Iniciar Sesión"} */}
				</Button>
			</form>

			<Typography variant='body2' textAlign='center' sx={{ mt: 3 }}>
				<a href='.' style={{ textDecoration: 'none', color: '#1976d2' }}>
					¿Olvidaste tu contraseña?
				</a>
			</Typography>
		</Box>
	);
};

export default LoginForm;
