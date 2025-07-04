import AccordionList from '@/components/common/AccordionList';
import type { Patient } from '@/components/common/types/patient';
import type { Therapist } from '@/components/common/types/therapist';
import { Button, ListItemButton, Typography } from '@mui/material';
import { AuthContext } from 'context/AuthContext';
import { useContext } from 'react';

const Home = () => {
	const authContext = useContext(AuthContext);
	const user = authContext?.user;
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
		id: 2,
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
			<Typography variant='h2' marginX={'auto'} width={'fit-content'}>
				Bienvenido{user ? `, ${user.name}` : null}
			</Typography>{' '}
			{/** poner el nombre*/}
			<AccordionList
				items={mockPatients.map((e) => (
					<ListItemButton key={`p-${e.id}`} href={`/${e.id}`}>
						{e.name}
					</ListItemButton>
				))}
				text='Pacientes asignados'
				title='Mis pacientes'
				defaultExpanded
			/>
			{/**Solo para los coordinadores */}
			<AccordionList
				items={mockPatients.map((e) => (
					<ListItemButton key={`p-${e.id}`} href={`/${e.id}`}>
						{e.name}
					</ListItemButton>
				))}
				text='Listado de todos los pacientes'
				title='Todos los pacientes'
				addButton
				buttonFunction={() => {
					console.log('form de paciente');
				}}
			/>
			<Button
				style={{ margin: '0 auto', display: 'block', width: 'fit-content' }}
				variant='contained'
				href='/therapist/0'
			>
				Administrar terapeutas
			</Button>
		</>
	);
};

export default Home;
