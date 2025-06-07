import AccordionList from '@/components/common/AccordionList';
import type { Patient } from '@/components/common/types/patient';
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	ListItem,
	ListItemButton,
	Menu,
	MenuItem,
	Modal,
	Select,
	type SelectChangeEvent,
	Typography,
} from '@mui/material';
import { useState } from 'react';
const Therapist = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedPatientId, setSelectedPatientId] = useState('');

	const patient1: Patient = {
		id: 1,
		name: 'pepito',
		dateCreation: new Date(),
	};
	const patient2: Patient = {
		id: 2,
		name: 'juanita',
		dateCreation: new Date(),
	};
	const mockPatients = [patient1, patient2];

	return (
		<>
			<Typography variant='h2'>Nombre de terapeuta</Typography>
			<AccordionList
				title='Pacientes'
				items={mockPatients.map((e) => (
					<ListItem key={`p-${e.id}`}>
						<ListItemButton>{e.name}</ListItemButton>
						<Button>Remover</Button>
					</ListItem>
				))}
				defaultExpanded
				addButton
				buttonFunction={() => console.log('modal de seleccionar paciente....')}
			/>
			<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
				<Box>
					<Typography variant='h4'>Agrega un paciente</Typography>
					<FormControl fullWidth>
						<InputLabel id='select-patient-label'>Paciente</InputLabel>
						<Select
							labelId='select-patient-label'
							id='select-patient'
							value={selectedPatientId}
							label='Age'
							onChange={(e: SelectChangeEvent) => {
								setSelectedPatientId(e.target.value);
							}}
						>
							{mockPatients.map((e) => (
								<MenuItem key={`mip-${e.id}`} value={`${e.id}`}>
									{e.name}
								</MenuItem>
							))}
						</Select>
						<Button>Agregar</Button>
					</FormControl>
				</Box>
			</Modal>
		</>
	);
};

export default Therapist;
