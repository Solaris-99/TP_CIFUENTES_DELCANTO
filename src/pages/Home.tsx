import AccordionList from '@/components/common/AccordionList';
import type { Patient } from '@/features/patient/types/patient';

import CreatePatientForm from '@/features/patient/components/CreatePatientForm';
import {
	createPatient,
	getCurrentUserPatients,
	getPatients,
} from '@/features/patient/services/patientService';
import { Button, ListItemButton, Typography } from '@mui/material';
import { AuthContext } from 'context/AuthContext';
import { useContext, useEffect, useState } from 'react';

const Home = () => {
	const authContext = useContext(AuthContext);
	const [userPatients, setUserPatients] = useState<Patient[]>([]);
	const user = authContext?.user;
	const [allPatients, setAllPatients] = useState<Patient[]>([]);

	useEffect(() => {
		getCurrentUserPatients().then((data) => setUserPatients(data));
		if (localStorage.getItem('role') === 'coordinator') {
			getPatients().then((data) => setAllPatients(data));
		}
	}, []);

	const [createPatientModalOpen, setCreatePatientModalOpen] = useState(false);

	return (
		<>
			<Typography variant='h2' marginX={'auto'} width={'fit-content'}>
				Bienvenido{user ? `, ${user.name}` : null}
			</Typography>{' '}
			<AccordionList
				items={userPatients.map((e) => (
					<ListItemButton key={`p-${e.id}`} href={`/patient/${e.id}`}>
						{e.name}
					</ListItemButton>
				))}
				text='Pacientes asignados'
				title='Mis pacientes'
				defaultExpanded
			/>
			{/**Solo para los coordinadores */}
			{localStorage.getItem('role') === 'coordinator' ? (
				<>
					<AccordionList
						items={allPatients.map((e) => (
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
					<Button
						style={{ margin: '0 auto', display: 'block', width: 'fit-content' }}
						variant='contained'
						href='/therapist'
					>
						Administrar terapeutas
					</Button>
				</>
			) : null}
			<CreatePatientForm
				open={createPatientModalOpen}
				handleClose={() => setCreatePatientModalOpen(false)}
				onSubmitSuccess={(patientData) => {
					createPatient(patientData).then((newPatient) => {
						setAllPatients([...allPatients, newPatient]);
						setCreatePatientModalOpen(false);
					});
				}}
			/>
		</>
	);
};

export default Home;
