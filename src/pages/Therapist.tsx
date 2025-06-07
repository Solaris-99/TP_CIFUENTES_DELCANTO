import AccordionList from '@/components/common/AccordionList';
import type { Patient } from '@/components/common/types/patient';
import { Button, ListItem, ListItemButton, Typography } from '@mui/material';
const Therapist = () => {
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
		</>
	);
};

export default Therapist;
