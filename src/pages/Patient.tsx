import AccordionList from '@/components/common/AccordionList';
import type { Program } from '@/components/common/types/program';
import { Button, ListItem, ListItemButton, Typography } from '@mui/material';
import { useParams } from 'react-router';

const Patient = () => {
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
			<Typography variant='h2' marginX={'auto'} width={'fit-content'}>
				Programación de {patientName}
			</Typography>
			<AccordionList
				items={wipPrograms.map((e) => (
					<ListItem key={e.id}>
						<ListItemButton href={`/${params.patientId}/${e.id}`}>
							{e.name}
						</ListItemButton>
						<Button
							onClick={() => {
								console.log(`reanudado: ${e.id}`);
							}}
						>
							Suspender
						</Button>
					</ListItem>
				))}
				title='En enseñanza'
				defaultExpanded
				addButton
				buttonFunction={() => {
					'form de programa';
				}}
			/>
			<AccordionList
				items={suspendedPrograms.map((e) => (
					<ListItem key={e.id}>
						<ListItemButton href={`/${params.patientId}/${e.id}`}>
							{e.name}
						</ListItemButton>
						<Button
							onClick={() => {
								console.log(`reanudado: ${e.id}`);
							}}
						>
							Reanudar
						</Button>
					</ListItem>
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
};
export default Patient;
