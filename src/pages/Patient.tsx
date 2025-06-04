import { ListItemButton, Typography } from '@mui/material';
import { useParams } from 'react-router';
import AccordionList from '../components/common/AccordionList';
import type { Program } from '../components/common/types/program';

export default function Patient() {
	//considerar cambiar los valores de estado
	const params = useParams(); //patient-id
	//mock
	const patientName = 'pepito';
	const programs: Program[] = [
		{
			id: 1,
			name: 'Vocales',
			dateCreation: new Date(),
			status: 'finished',
			lastUpdated: new Date(),
			antecedent: 'asdasd',
		},
		{
			id: 1,
			name: 'bcf',
			dateCreation: new Date(),
			status: 'wip',
			lastUpdated: new Date(),
			antecedent: 'asdasd',
		},
		{
			id: 1,
			name: 'ghj',
			dateCreation: new Date(),
			status: 'suspended',
			lastUpdated: new Date(),
			antecedent: 'asdasd',
		},
	];

	const programsCompleted = programs.filter((e) => e.status === 'finished');
	const currentPrograms = programs.filter((e) => e.status === 'wip');
	const programsSuspended = programs.filter((e) => e.status === 'suspended');

	return (
		<>
			<Typography variant='h2'>Programación de {patientName}</Typography>
			<p>{params.patientId}</p>
			<AccordionList
				items={currentPrograms.map((e) => (
					<ListItemButton key={e.id}>{e.name}</ListItemButton>
				))}
				text='Listado de todos los programas en enseñanza'
				title='En enseñanza'
				addButtonText='Agregar'
				defaultExpanded
			/>
			<AccordionList
				items={programsSuspended.map((e) => (
					<ListItemButton key={e.id}>{e.name}</ListItemButton>
				))}
				text='Listado de todos los programas suspendidos'
				title='Suspendidos'
				addButtonText='Agregar'
			/>
			<AccordionList
				items={programsCompleted.map((e) => (
					<ListItemButton key={e.id}>{e.name}</ListItemButton>
				))}
				text='Listado de todos los programas completados'
				title='Completos'
				addButtonText='Agregar'
			/>
		</>
	);
}
