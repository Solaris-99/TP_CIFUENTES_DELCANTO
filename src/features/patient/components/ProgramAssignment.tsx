import SearchField from '@/components/SearchField';
import type { Program } from '@/components/common/types/program';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import {
	Box,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Paper,
	Tab,
	Tabs,
	Tooltip,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

const programsDefault: Program[] = [
	{
		id: 1,
		dateCreation: new Date('2023-05-15'),
		lastUpdated: new Date('2024-03-22'),
		name: 'Renacer Infantil',
		antecedent: 'Programa para niños con traumas por separación familiar.',
		status: 'Activo',
	},
	{
		id: 2,
		dateCreation: new Date('2022-11-03'),
		name: 'Juega y Sana',
		antecedent: 'Terapia lúdica para niños con trastornos emocionales leves.',
		lastUpdated: new Date('2023-01-18'),
		status: 'Completo',
	},
	{
		id: 3,
		name: 'Creciendo Fuertes',
		dateCreation: new Date('2021-09-10'),
		lastUpdated: new Date('2023-01-18'),
		antecedent:
			'Prevención y tratamiento de ansiedad en menores escolarizados.',
		status: 'Suspendido',
	},
];

const ProgramAssignment = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const [programs, setPrograms] = useState<Program[]>([]);
	const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);

	useEffect(() => {
		setPrograms(programsDefault);
		setFilteredPrograms(programsDefault);
	}, []);

	const handleAsignProgram = (id) => {
		console.log(`Asignar programa con id: ${id}`);
		// Implement assign logic here
	};
	const handleRemoveProgram = (id) => {
		console.log(`Eliminar programa con id: ${id}`);
		// Implement remove logic here
	};

	return (
		<Paper variant='outlined' sx={{ padding: '.5rem' }}>
			<Box height='5rem'>
				<Typography
					variant='h6'
					component='h2'
					width={'100%'}
					textAlign='center'
				>
					Programas
				</Typography>
				<Tabs
					variant='scrollable'
					value={tabIndex}
					onChange={(_, val) => setTabIndex(val)}
					sx={{ width: '100%' }}
				>
					<Tab label='Activos' />
					<Tab label='Completos' />
					<Tab label='Suspendidos' />
				</Tabs>
			</Box>

			<Box>
				<Box display='flex'>
					<SearchField
						data={programs}
						searchKey='name'
						onFiltered={setFilteredPrograms}
						placeholder='Buscar programa'
					/>
					<Tooltip title='Agregar programa' arrow>
						<IconButton
							aria-label='add program'
							size='small'
							onClick={() => {}}
							sx={{ marginTop: '1rem' }}
						>
							<AddIcon />
						</IconButton>
					</Tooltip>
				</Box>

				<List dense={true} sx={{ maxHeight: '25rem', overflowY: 'auto' }}>
					{filteredPrograms.map((program) => (
						<ListItem
							dense={true}
							key={program.id}
							sx={{
								paddingInline: '.5rem',
							}}
							disablePadding
							secondaryAction={
								<Tooltip title='Eliminar' arrow>
									<IconButton
										edge='end'
										size='small'
										onClick={() => handleRemoveProgram(program.id)}
									>
										<CancelIcon />
									</IconButton>
								</Tooltip>
							}
						>
							<ListItemText
								slotProps={{
									primary: { fontWeight: 'bold', paddingRight: '2rem' },
								}}
								primary={program.name}
								secondary='3 sesiones'
							/>
						</ListItem>
					))}
				</List>
			</Box>
		</Paper>
	);
};

export default ProgramAssignment;
