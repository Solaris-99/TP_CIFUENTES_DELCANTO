import SearchField from '@/components/SearchField';
import DialogForm from '@/components/common/DialogForm';
import type { Program } from '@/components/common/types/program';
import { MoreVert } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import {
	Box,
	Chip,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Paper,
	Tab,
	Tabs,
	Tooltip,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const programsDefault: Program[] = [
	{
		id: 1,
		dateCreation: new Date('2023-05-15'),
		lastUpdated: new Date('2024-03-22'),
		name: 'Renacer Infantil',
		antecedent: 'Programa para niños con traumas por separación familiar.',
		status: 'Activo',
		steps: [],
	},
	{
		id: 2,
		dateCreation: new Date('2022-11-03'),
		name: 'Juega y Sana',
		antecedent: 'Terapia lúdica para niños con trastornos emocionales leves.',
		lastUpdated: new Date('2023-01-18'),
		status: 'Completo',
		steps: [],
	},
	{
		id: 3,
		name: 'Creciendo Fuertes',
		dateCreation: new Date('2021-09-10'),
		lastUpdated: new Date('2023-01-18'),
		antecedent:
			'Prevención y tratamiento de ansiedad en menores escolarizados.',
		status: 'Suspendido',
		steps: [],
	},
];

const ProgramAssignment = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const [programs, setPrograms] = useState<Program[]>([]);
	const [addProgramDialogOpen, setAddProgramDialogOpen] = useState(false);
	const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
	const [selectedItem, setSelectedItem] = useState<number | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		setPrograms(programsDefault);
		setFilteredPrograms(programsDefault);
		const programId = searchParams.get('programId');
		if (programId) {
			const program = programsDefault.find(
				(p) => p.id.toString() === programId
			);
			if (program) {
				const itemIdx = programsDefault.indexOf(program);
				setSelectedItem(itemIdx);
				//setTabIndex(program.status === 'Activo' ? 0 : program.status === 'Completo' ? 1 : program.status === 'Suspendido' ? 2 : 0);
			}
		}
	}, [searchParams]);

	const handleSelectProgram = (id: number, itemIdx: number) => {
		setSelectedItem(itemIdx);
		setSearchParams({ programId: id.toString() });
	};
	const handleRemoveProgram = (id: number) => {
		setPrograms(programs.filter((p) => p.id !== id));
		console.log(`Eliminar programa con id: ${id}`);
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
							onClick={() => {
								setAddProgramDialogOpen(true);
							}}
							sx={{ marginTop: '1rem' }}
						>
							<AddIcon />
						</IconButton>
					</Tooltip>
					<DialogForm
						onSubmitSuccess={(data) => {
							console.log(data);
							const newProgram: Program = {
								id: Math.ceil(Math.random() * 150 + 10),
								dateCreation: new Date(),
								lastUpdated: new Date(),
								name: data,
								antecedent: '',
								status: 'Activo',
								steps: [],
							};
							setPrograms([...programs, newProgram]);
						}}
						title='Añadir un programa'
						fieldLabel='Nombre del Programa'
						open={addProgramDialogOpen}
						fieldName='add-program-name'
						handleClose={() => setAddProgramDialogOpen(false)}
					/>
				</Box>

				<List dense={true} sx={{ maxHeight: '25rem', overflowY: 'auto' }}>
					{filteredPrograms.map((program, idx) => (
						<ListItem
							disablePadding
							key={program.id}
							dense={true}
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
							<ListItemButton
								selected={idx === selectedItem}
								onClick={() => handleSelectProgram(program.id, idx)}
								sx={{
									paddingInline: '.5rem',
								}}
							>
								<ListItemText
									slotProps={{
										primary: { fontWeight: 'bold', paddingRight: '2rem' },
									}}
									primary={program.name}
									secondary='3 sesiones'
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</Paper>
	);
};

export default ProgramAssignment;
