import { zodResolver } from '@hookform/resolvers/zod'; // Necesitas instalar esta dependencia
import { Alert, Button, TextField } from '@mui/material';
import { AuthContext } from 'context/AuthContext';
import { type FC, useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { type LoginFormValues, loginSchema } from '../schemas/loginSchema'; // Importa el esquema Zod
import { loginUser } from '../services/authService';

interface LoginFormProps {
	initialValues?: LoginFormValues;
	onSubmitSuccess: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onSubmitSuccess }) => {
	const authContext = useContext(AuthContext);

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
			authContext?.setUser(response.user);
			console.log('Usuario logueado:', response);
			reset();
			onSubmitSuccess();
		} catch (error) {
			console.error('Error al loguearse:', error);
			setError('Hubo un error al loguearse. Por favor, intenta de nuevo.');
		}
	};

	return (
		<>
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
					sx={{ mt: 10 }}
					/* TODO: Create a loading hook */
					/* disabled={isLoading} */
				>
					Iniciar Sesión
					{/* {isLoading ? <CircularProgress size={24} color="inherit" /> : "Iniciar Sesión"} */}
				</Button>
			</form>
		</>
	);
};

export default LoginForm;
