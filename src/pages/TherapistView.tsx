import AccordionList from '@/components/common/AccordionList';
import type { Patient } from '@/components/common/types/patient';
import type { Therapist } from '@/components/common/types/therapist';
import AddPatientForm from '@/features/patient/components/AddPatientForm';
import AddTherapistModal from '@/features/therapist/components/AddTherapistModal';
import {
	Box,
	Button,
	ListItem,
	ListItemButton,
	Paper,
	Typography,
} from '@mui/material';
import { useState } from 'react';

const modalStyle: React.CSSProperties = {
	width: 'fit-content',
	position: 'absolute',
	top: '25%',
	left: '40%',
};

const TherapistView = () => {
	const [modalPatientOpen, setModalPatientOpen] = useState(false);
	const [modalTherapistOpen, setModalTherapistOpen] = useState(false);
	const [selectedTherapist, setSelectedTherapist] = useState<Therapist>();
	const [patients, setPatients] = useState<Patient[]>([]);

	/**
	 * when selecting therapist
	 * then get patient of therapist
	 * then update view of patients.
	 * create usestate for patients.
	 *
	 */

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
	const ther1: Therapist = {
		id: 1,
		name: 'juancito',
		dateCreation: new Date(),
		isCoordinator: false,
		email: 'jj@gmail.com',
		title: 'psicologo',
	};
	const ther2: Therapist = {
		id: 2,
		name: 'pancracio',
		dateCreation: new Date(),
		isCoordinator: false,
		email: 'pan@gmail.com',
		title: 'psicologo',
	};
	const mockTher = [ther1, ther2];

	return (
		<>
			<Typography variant='h2'>
				{selectedTherapist ? selectedTherapist.name : 'Terapeutas'}
			</Typography>
			<Paper style={{ padding: '1rem', marginTop: '1rem' }}>
				{selectedTherapist ? (
					<Typography>
						Email: {selectedTherapist.email}. Título: {selectedTherapist.title}.
						Usuario creado el: {selectedTherapist.dateCreation.toUTCString()}.
						Es coordinador: {selectedTherapist.isCoordinator ? 'Sí' : 'No'}
					</Typography>
				) : (
					<Typography>Selecciona un terapeuta.</Typography>
				)}
			</Paper>

			<Box style={{ display: 'flex', justifyContent: 'space-between' }}>
				<AccordionList
					items={mockTher.map((e) => (
						<ListItem key={`t-${e.id}`}>
							<ListItemButton
								onClick={() => {
									setSelectedTherapist(e);
									setPatients(mockPatients);
								}}
							>
								{e.name}
							</ListItemButton>
							<Button>Borrar</Button>
						</ListItem>
					))}
					text='Listado de todos los terapeutas'
					title='Terapeutas'
					defaultExpanded
					addButton
					buttonFunction={() => setModalTherapistOpen(true)}
				/>
				<AccordionList
					title='Pacientes'
					text={
						selectedTherapist
							? `Pacientes de ${selectedTherapist.name}`
							: 'Selecciona un terapeuta'
					}
					items={patients.map((e) => (
						<ListItem key={`p-${e.id}`}>
							<ListItemButton href={`/${e.id}`}>{e.name}</ListItemButton>
							<Button>Remover</Button>
						</ListItem>
					))}
					defaultExpanded
					addButton={!!selectedTherapist}
					buttonFunction={() => setModalPatientOpen(true)}
				/>
			</Box>
			<AddPatientForm
				onSubmit={(e) => {
					e.preventDefault();
					console.log('agregado');
				}}
				open={modalPatientOpen}
				style={modalStyle}
				patients={mockPatients}
				onClose={() => setModalPatientOpen(false)}
			/>
			<AddTherapistModal
				open={modalTherapistOpen}
				style={modalStyle}
				onClose={() => setModalTherapistOpen(false)}
				onSubmitSuccess={() => console.log('terapeuta creado')}
			/>
		</>
	);
};

export default TherapistView;
