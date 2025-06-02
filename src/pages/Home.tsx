import { Typography, ListItemButton } from '@mui/material';
import type { Patient } from '../components/common/types/patient';
import type { Therapist } from '../components/common/types/therapist';
import AccordionList from '../components/common/AccordionList';

const Home = () => {
	// Mock data for patients in services
	const patient1: Patient = {
		id: 1,
		name: 'pepito',
		date_creation: new Date(),
	};
	const patient2: Patient = {
		id: 2,
		name: 'juanita',
		date_creation: new Date(),
	};
	const ther1 : Therapist = {
		id: 1,
		name: "juancito",
		date_creation: new Date(),
		is_coordinator: false,
		email:"jj@gmail.com",
		title: "psicologo"
	}
	const ther2 : Therapist = {
		id: 1,
		name: "pancracio",
		date_creation: new Date(),
		is_coordinator: false,
		email:"pan@gmail.com",
		title: "psicologo"
	}


	const mockPatients = [patient1, patient2];
	const mockTher = [ther1, ther2];

	return (
		<>
			<h1>Home</h1>
			<Typography variant='h1'>Pasos</Typography>

			<AccordionList items={mockPatients.map(e=><ListItemButton key={e.id}>{e.name}</ListItemButton>)} text="Listado de todos los pacientes" title="Pacientes" addButtonText='Agregar'/>
			<AccordionList items={mockTher.map(e=><ListItemButton key={e.id}>{e.name}</ListItemButton>)} text="Listado de todos los terapeutas" title="Terapeutas" addButtonText='Agregar'/>

		</>
	);
};

export default Home;
