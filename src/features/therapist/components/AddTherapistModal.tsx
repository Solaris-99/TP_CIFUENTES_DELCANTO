import {
	type TherapistFormValues,
	therapistSchema,
} from '@/features/therapist/schema/therapistSchema';
import type { Therapist } from '@/features/therapist/types/therapistsTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Button,
	FormControl,
	Modal,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';

interface AddTherapistModalProps {
	style?: React.CSSProperties;
	open: boolean;
	onClose?: (() => void) | undefined;
	onSubmitSuccess: (data: Therapist) => void;
}

const AddTherapistModal: FC<AddTherapistModalProps> = ({
	style,
	open,
	onClose,
	onSubmitSuccess,
}) => {
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TherapistFormValues>({
		resolver: zodResolver(therapistSchema),
		defaultValues: { email: '', password: '', name: '', title: '' },
	});

	const onSubmit = async (data: TherapistFormValues) => {
		try {
			console.log('creando terapueta...');
			//const response = await createTherapist(data);
			const mockedResponse: Therapist = {
				...data,
				id: Math.floor(Math.random() * 1000),
				is_coordinator: false,
				date_creation: new Date(),
			};
			onSubmitSuccess(mockedResponse);
			reset();
		} catch (error) {
			// TODO: Setup errors in constants
			console.error('Error al crear terapueta:', error);
			setError(
				'Hubo un error al crear el usuario. Por favor, intenta de nuevo.'
			);
		}
	};

	return (
		<Modal id='modal-therapist' style={style} open={open} onClose={onClose}>
			<Paper style={{ padding: '2rem' }}>
				<Typography variant='h4'>Agrega un terapeuta</Typography>
				{error ? <Typography color='red'>{error}</Typography> : null}
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<FormControl style={{ marginTop: '1rem' }} fullWidth>
						<TextField
							margin='normal'
							required
							id='add-th-email'
							label='Email'
							type='email'
							{...register('email')}
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
						<TextField
							margin='normal'
							required
							id='add-th-password'
							label='Password'
							type='password'
							{...register('password')}
							error={!!errors.password}
							helperText={errors.password?.message}
						/>
						<TextField
							margin='normal'
							required
							id='add-th-name'
							label='Nombre'
							type='text'
							{...register('name')}
							error={!!errors.name}
							helperText={errors.name?.message}
						/>
						<TextField
							margin='normal'
							required
							id='add-th-title'
							label='Título'
							type='text'
							{...register('title')}
							error={!!errors.title}
							helperText={errors.title?.message}
						/>

						<Button
							style={{ width: 'fit-content', margin: '5px auto' }}
							type='submit'
							variant='contained'
						>
							Agregar
						</Button>
					</FormControl>
				</form>
			</Paper>
		</Modal>
	);
};

export default AddTherapistModal;
