import AccordionList from '@/components/common/AccordionList';
import type { Patient } from '@/components/common/types/patient';
import AddPatientForm from '@/features/patient/components/AddPatientForm';
import AddTherapistModal from '@/features/therapist/components/AddTherapistModal';
import {
	deleteTherapist,
	getTherapists,
} from '@/features/therapist/services/therapistsService';
import type { Therapist } from '@/features/therapist/types/therapistsTypes';
import {
	Box,
	Button,
	ListItem,
	ListItemButton,
	Paper,
	Typography,
} from '@mui/material';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';

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

	const [patients, setPatients] = useState<Patient[]>([]);

	const [therapists, setTherapists] = useState<Therapist[]>([]);

	useEffect(() => {
		getTherapists().then((thers) => {
			setTherapists(thers);
			console.log(thers);
		});
	}, []);

	return (
		<>
			<Typography variant='h2'>
				{selectedTherapist ? selectedTherapist.name : 'Terapeutas'}
			</Typography>
			<Paper style={{ padding: '1rem', marginTop: '1rem' }}>
				{selectedTherapist ? (
					<>
						<Typography variant='h5' style={{ margin: '5px 5px' }}>
							Datos
						</Typography>
						<TableContainer>
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>Email</TableCell>
										<TableCell>{selectedTherapist.email}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Título</TableCell>
										<TableCell>{selectedTherapist.title}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Creado</TableCell>
										<TableCell>
											{selectedTherapist.date_creation.toUTCString()}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Es coordinador</TableCell>
										<TableCell>
											{selectedTherapist.is_coordinator ? 'Sí' : 'No'}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</>
				) : (
					<Typography>Selecciona un terapeuta.</Typography>
				)}
			</Paper>

			<Box style={{ display: 'flex', justifyContent: 'space-between' }}>
				<AccordionList
					items={therapists.map((e) => (
						<ListItem key={`t-${e.id}`}>
							<ListItemButton
								onClick={() => {
									setSelectedTherapist(e);
									setPatients(mockPatients);
								}}
							>
								{e.name}
							</ListItemButton>
							<Button
								onClick={() => {
									deleteTherapist(e.id);
								}}
							>
								Borrar
							</Button>
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
					items={patients.map((e, i) => (
						<ListItem key={`p-${e.id}`} id={`p-${e.id}`}>
							<ListItemButton href={`/patient/${e.id}`}>
								{e.name}
							</ListItemButton>
							<Button
								onClick={() => {
									setPatients(patients.filter((f) => f.id !== e.id));
								}}
							>
								Remover
							</Button>
						</ListItem>
					))}
					defaultExpanded
					addButton={!!selectedTherapist}
					buttonFunction={() => setModalPatientOpen(true)}
				/>
			</Box>
			<AddPatientForm
				onSubmitSuccess={(id) => {
					//setPatients([...patients, mockPatients[parseInt(id)]])
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
				onSubmitSuccess={(ther) => {
					setTherapists([...therapists, ther]);
					setModalTherapistOpen(false);
					console.log('Added therpist');
				}}
			/>
		</>
	);
};

export default TherapistView;
