import SearchField from '@/components/SearchField';
import DialogForm from '@/components/common/DialogForm';
import {
	addPatientProgram,
	getPatientPrograms,
	removeProgram,
} from '@/features/patient/services/patientService';
import type { Program } from '@/features/patient/types/program';
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
import { useParams, useSearchParams } from 'react-router';

const ProgramAssignment = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const [programs, setPrograms] = useState<Program[]>([]);
	const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
	const [selectedItem, setSelectedItem] = useState<number | null>(null);
	const [addProgramDialogOpen, setAddProgramDialogOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const { patientId } = useParams();

	useEffect(() => {
		if (!patientId) return;

		getPatientPrograms(Number(patientId)).then((data) => {
			setPrograms(data.filter((p) => p.status === tabFilter(tabIndex)));
			setFilteredPrograms(data);

			const programId = searchParams.get('programId');
			if (programId) {
				const program = data.find((p) => p.id.toString() === programId);
				if (program) {
					const itemIdx = data.indexOf(program);
					setSelectedItem(itemIdx);
				}
			}
		});
	}, [patientId, searchParams, tabIndex]);

	const tabFilter = (tabIndex: number) => {
		switch (tabIndex) {
			case 0:
				return 'Activo';
			case 1:
				return 'Completado';
			case 2:
				return 'Suspendido';
			default:
				return 'Activo';
		}
	};

	const handleAddProgram = async (name: string) => {
		if (!patientId) return;
		const program = await addPatientProgram(Number(patientId), name);
		console.log(`Programa agregado: ${JSON.stringify(program)}`);
		if (program) {
			const updatedPrograms = [...programs, program];
			setPrograms(updatedPrograms);
			setFilteredPrograms(updatedPrograms);
		}
	};

	const handleSelectProgram = (id: number, itemIdx: number) => {
		setSelectedItem(itemIdx);
		setSearchParams({ programId: id.toString() });
	};

	const handleRemoveProgram = async (id: number) => {
		const response = await removeProgram(id);
		if (response.status !== 204) {
			console.error('Error al eliminar el programa:', response);
			return;
		}
		setPrograms(programs.filter((p) => p.id !== id));
	};

	return (
		<Paper variant='outlined' sx={{ padding: '.5rem' }}>
			<Box height='5rem'>
				<Typography variant='h6' component='h2' width='100%' textAlign='center'>
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
						onSubmitSuccess={handleAddProgram}
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
								sx={{ paddingInline: '.5rem' }}
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
