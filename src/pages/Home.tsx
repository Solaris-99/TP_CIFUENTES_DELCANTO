import { ListItemButton, Typography } from '@mui/material';
import AccordionList from '../components/common/AccordionList';
import type { Patient } from '../components/common/types/patient';
import type { Therapist } from '../components/common/types/therapist';

const Home = () => {
	// Mock data for patients in services
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
	const ther1: Therapist = {
		id: 1,
		name: 'juancito',
		dateCreation: new Date(),
		isCoordinator: false,
		email: 'jj@gmail.com',
		title: 'psicologo',
	};
	const ther2: Therapist = {
		id: 1,
		name: 'pancracio',
		dateCreation: new Date(),
		isCoordinator: false,
		email: 'pan@gmail.com',
		title: 'psicologo',
	};

	const mockPatients = [patient1, patient2];
	const mockTher = [ther1, ther2];

	return (
		<>
			<h1>Home</h1>
			<Typography variant='h1'>Pasos</Typography>

			<AccordionList
				items={mockPatients.map((e) => (
					<ListItemButton key={e.id} href={`/${e.id}`}>
						{e.name}
					</ListItemButton>
				))}
				text='Listado de todos los pacientes'
				title='Pacientes'
				addButtonText='Agregar'
				defaultExpanded
			/>
			<AccordionList
				items={mockTher.map((e) => (
					<ListItemButton key={e.id}>{e.name}</ListItemButton>
				))}
				text='Listado de todos los terapeutas'
				title='Terapeutas'
				addButtonText='Agregar'
			/>
		</>
	);
};

export default Home;
