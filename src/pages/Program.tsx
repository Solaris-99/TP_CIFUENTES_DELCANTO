import {
	Box,
	Button,
	ListItemButton,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router';
import AccordionList from '../components/common/AccordionList';
import type { ProgramItem } from '../components/common/types/programItem';
import type { Response } from '../components/common/types/response';

export default function Program() {
	const params = useParams(); // programId
	const [selectedItem, setSelectedItem] = useState(0);

	const programName = 'Vocales';
	const programItems: ProgramItem[] = [
		{
			id: 1,
			name: 'a',
			dateCreation: new Date(),
			lastUpdated: new Date(),
			status: 'finished',
		},
		{
			id: 2,
			name: 'e',
			dateCreation: new Date(),
			lastUpdated: new Date(),
			status: 'wip',
		},
		{
			id: 3,
			name: 'i',
			dateCreation: new Date(),
			lastUpdated: new Date(),
			status: 'wip',
		},
		{
			id: 4,
			name: 'o',
			dateCreation: new Date(),
			lastUpdated: new Date(),
			status: 'suspended',
		},
		{
			id: 5,
			name: 'u',
			dateCreation: new Date(),
			lastUpdated: new Date(),
			status: 'suspended',
		},
	];
	const wipItems = programItems.filter((e) => e.status === 'wip');
	const suspendedItems = programItems.filter((e) => e.status === 'suspended');
	const finishedItems = programItems.filter((e) => e.status === 'finished');
	const responses: Response[] = [
		{ id: 1, response: '+', dateCreation: new Date() },
		{ id: 2, response: '-', dateCreation: new Date() },
		{ id: 3, response: 'nr', dateCreation: new Date() },
		{ id: 4, response: '+', dateCreation: new Date() },
		{ id: 5, response: 'nr', dateCreation: new Date() },
	];

	return (
		<>
			<Typography variant='h2'>{programName}</Typography>
			<Box marginBottom={'3rem'} display={'flex'}>
				<Box width={'75%'}>
					<AccordionList
						items={wipItems.map((e) => (
							<ListItemButton key={`iw-${e.id}`}>{e.name}</ListItemButton>
						))}
						text='Items en enseñanza'
						title='En enseñanza'
						defaultExpanded
					/>
					<AccordionList
						items={suspendedItems.map((e) => (
							<ListItemButton key={`is-${e.id}`}>{e.name}</ListItemButton>
						))}
						text='Items suspendidos'
						title='Suspendidos'
					/>
					<AccordionList
						items={finishedItems.map((e) => (
							<ListItemButton key={`if-${e.id}`}>{e.name}</ListItemButton>
						))}
						text='Items suspendidos'
						title='Completos'
					/>
				</Box>
				<Box>
					<AccordionList
						items={responses.map((e) => (
							<ListItemButton
								key={`r-${e.id}`}
								style={{ display: 'flex', justifyContent: 'space-between' }}
							>
								<Box style={{ padding: 8, borderRight: '1px solid gray' }}>
									{`${e.dateCreation.getDate()}/${e.dateCreation.getMonth() + 1}/${e.dateCreation.getFullYear()}`}
								</Box>
								<Box style={{ padding: 8 }}>{e.response}</Box>
							</ListItemButton>
						))}
						title='Registro de respuestas' //poner el nombre del programa activo
						defaultExpanded
						addButton
						buttonFunction={() => {
							console.log('registro creado');
						}}
					/>
				</Box>
			</Box>
			<Box>
				<Typography variant='h4'>Otros programas activos</Typography>
				{/**Solo programas activos */}
				<Stack
					direction='row'
					spacing={1}
					sx={{
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Button href='#'>Programa 1</Button>
					<Button href='#'>Programa 2</Button>
					<Button href='#'>Programa 3</Button>
				</Stack>
			</Box>
		</>
	);
}
