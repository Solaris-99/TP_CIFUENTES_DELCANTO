import AccordionList from '@/components/common/AccordionList';
import type { Patient } from '@/features/patient/types/patient';
import type { Therapist } from '@/features/therapist/types/therapistsTypes';

import CreatePatientForm from '@/features/patient/components/CreatePatientForm';
import { Button, ListItemButton, Typography } from '@mui/material';
import { AuthContext } from 'context/AuthContext';
import { useContext, useState } from 'react';

const Home = () => {
	const authContext = useContext(AuthContext);
	const user = authContext?.user;
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
	const ther1: Therapist = {
		id: 1,
		name: 'juancito',
		date_creation: new Date(),
		is_coordinator: false,
		email: 'jj@gmail.com',
		title: 'psicologo',
	};
	const ther2: Therapist = {
		id: 2,
		name: 'pancracio',
		date_creation: new Date(),
		is_coordinator: false,
		email: 'pan@gmail.com',
		title: 'psicologo',
	};
	const [createPatientModalOpen, setCreatePatientModalOpen] = useState(false);
	const mockPatients = [patient1, patient2];
	const mockTher = [ther1, ther2];

	return (
		<>
			<Typography variant='h2' marginX={'auto'} width={'fit-content'}>
				Bienvenido{user ? `, ${user.name}` : null}
			</Typography>{' '}
			<AccordionList
				items={mockPatients.map((e) => (
					<ListItemButton key={`p-${e.id}`} href={`/patient/${e.id}`}>
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
					<ListItemButton key={`p-${e.id}`} href={`/patient/${e.id}`}>
						{e.name}
					</ListItemButton>
				))}
				text='Listado de todos los pacientes'
				title='Todos los pacientes'
				addButton
				buttonFunction={() => {
					setCreatePatientModalOpen(true);
				}}
			/>
			{localStorage.getItem('role') === 'coordinator' ? (
				<Button
					style={{ margin: '0 auto', display: 'block', width: 'fit-content' }}
					variant='contained'
					href='/therapist'
				>
					Administrar terapeutas
				</Button>
			) : null}
			<CreatePatientForm
				open={createPatientModalOpen}
				handleClose={() => setCreatePatientModalOpen(false)}
				onSubmitSuccess={() => {
					console.log('paciente creado');
				}}
			/>
		</>
	);
};

export default Home;
