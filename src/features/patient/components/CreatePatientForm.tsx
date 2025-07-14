import { zodResolver } from '@hookform/resolvers/zod';
import {
	Alert,
	Button,
	InputLabel,
	Modal,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	type CreatePatientValues,
	createPatientSchema,
} from '../schema/createPatientSchema';

interface CreatePatientFormProps {
	open: boolean;
	handleClose: () => void;
	onSubmitSuccess: () => void;
}

const CreatePatientForm: FC<CreatePatientFormProps> = ({
	onSubmitSuccess,
	open,
	handleClose,
}) => {
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreatePatientValues>({
		resolver: zodResolver(createPatientSchema),
		defaultValues: { name: '' },
	});

	const onSubmit = async (data: CreatePatientValues) => {
		try {
			//const newPatient: Patient = {...} //agregar fechas
			//const response = await createPatient(data);
			reset();
			onSubmitSuccess();
		} catch (error) {
			console.error('Error al crear paciente:', error);
			setError(
				'Hubo un error al crear el paciente. Por favor, intenta de nuevo.'
			);
		}
	};
	const style: React.CSSProperties = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		padding: '2rem',
	};

	return (
		<>
			{error && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}
			<Modal
				open={open}
				onClose={() => handleClose()}
				aria-labelledby='create-patient'
			>
				<Paper style={style}>
					<Typography variant='h6' component='h2'>
						Agregar un paciente
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)} noValidate>
						<TextField
							label='Nombre del paciente'
							type='text'
							fullWidth
							autoComplete='name'
							margin='normal'
							{...register('name')}
							error={!!errors.name}
							helperText={errors.name?.message}
						/>
						<TextField
							label='DNI'
							type='number'
							fullWidth
							margin='normal'
							{...register('dni')}
							error={!!errors.dni}
							helperText={errors.dni?.message}
						/>
						<TextField
							slotProps={{ inputLabel: { shrink: true } }}
							label='Fecha de nacimiento'
							type='date'
							fullWidth
							margin='normal'
							{...register('birthdate')}
							error={!!errors.birthdate}
							helperText={errors.birthdate?.message}
						/>
						<TextField
							label='Diagnostico'
							type='text'
							fullWidth
							margin='normal'
							{...register('diagnosis')}
							error={!!errors.diagnosis}
							helperText={errors.diagnosis?.message}
						/>
						<TextField
							label='Observaciones'
							type='text'
							fullWidth
							margin='normal'
							{...register('observations')}
							error={!!errors.observations}
							helperText={errors.observations?.message}
						/>
						<Button
							type='submit'
							variant='contained'
							fullWidth
							sx={{ mt: 5 }}
							/* TODO: Create a loading hook */
							/* disabled={isLoading} */
						>
							Crear
							{/* {isLoading ? <CircularProgress size={24} color="inherit" /> : "Iniciar Sesión"} */}
						</Button>
					</form>
				</Paper>
			</Modal>
		</>
	);
};

export default CreatePatientForm;
