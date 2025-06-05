import { ListItemButton, Typography } from '@mui/material';
import { useParams } from 'react-router';
import AccordionList from '../components/common/AccordionList';
import type { Program } from '../components/common/types/program';

export default function Patient() {
	//considerar cambiar los valores de estado
	const params = useParams(); //patientId
	//mock
	const patientName = 'pepito';
	const programs: Program[] = [
		{
			id: 1,
			name: 'Vocales',
			dateCreation: new Date(),
			status: 'wip',
			lastUpdated: new Date(),
			antecedent: 'asdasd',
		},
		{
			id: 2,
			name: 'bcf',
			dateCreation: new Date(),
			status: 'finished',
			lastUpdated: new Date(),
			antecedent: 'asdasd',
		},
		{
			id: 3,
			name: 'ghj',
			dateCreation: new Date(),
			status: 'suspended',
			lastUpdated: new Date(),
			antecedent: 'asdasd',
		},
	];

	const finishedPrograms = programs.filter((e) => e.status === 'finished');
	const wipPrograms = programs.filter((e) => e.status === 'wip');
	const suspendedPrograms = programs.filter((e) => e.status === 'suspended');

	return (
		<>
			<Typography variant='h2'>Programación de {patientName}</Typography>
			<p>{params.patientId}</p>
			<AccordionList
				items={wipPrograms.map((e) => (
					<ListItemButton href={`/${params.patientId}/${e.id}`} key={e.id}>
						{e.name}
					</ListItemButton>
				))}
				title='En enseñanza'
				defaultExpanded
			/>
			<AccordionList
				items={suspendedPrograms.map((e) => (
					<ListItemButton href={`/${params.patientId}/${e.id}`} key={e.id}>
						{e.name}
					</ListItemButton>
				))}
				title='Suspendidos'
			/>
			<AccordionList
				items={finishedPrograms.map((e) => (
					<ListItemButton href={`/${params.patientId}/${e.id}`} key={e.id}>
						{e.name}
					</ListItemButton>
				))}
				title='Completos'
			/>
		</>
	);
}
