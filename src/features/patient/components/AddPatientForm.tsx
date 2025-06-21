import type { Patient } from '@/components/common/types/patient';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Paper,
	Select,
	type SelectChangeEvent,
	Typography,
} from '@mui/material';
import { type FC, useState } from 'react';

interface PatientFormProps {
	patients: Patient[];
	open: boolean;
	onClose?: (() => void) | undefined;
	style?: React.CSSProperties;
	onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

const AddPatientForm: FC<PatientFormProps> = ({
	patients,
	open,
	onClose,
	style,
	onSubmit,
}) => {
	const [selectedPatientId, setSelectedPatientId] = useState(''); // modal

	return (
		<Modal id='modal-patient' style={style} open={open} onClose={onClose}>
			<Paper style={{ padding: '1rem' }}>
				<Typography variant='h4'>Agrega un paciente</Typography>
				<form onSubmit={onSubmit}>
					<FormControl style={{ marginTop: '1rem' }} fullWidth>
						<InputLabel id='select-patient-label'>Paciente</InputLabel>
						<Select
							labelId='select-patient-label'
							id='select-patient'
							value={selectedPatientId}
							label='Age'
							onChange={(e: SelectChangeEvent) => {
								setSelectedPatientId(e.target.value);
							}}
							style={{ margin: '1rem' }}
						>
							{patients.map((e) => (
								<MenuItem key={`mip-${e.id}`} value={`${e.id}`}>
									{e.name}
								</MenuItem>
							))}
						</Select>
						<Button
							type='submit'
							variant='contained'
							style={{ width: 'fit-content', margin: '5px auto' }}
						>
							Agregar
						</Button>
					</FormControl>
				</form>
			</Paper>
		</Modal>
	);
};
export default AddPatientForm;
