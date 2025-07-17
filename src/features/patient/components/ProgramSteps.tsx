import SearchField from '@/components/SearchField';
import DialogForm from '@/components/common/DialogForm';
import type { Program, Unit } from '@/features/patient/types/program';
import { MoreVert } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import {
	Box,
	Chip,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Menu,
	MenuItem,
	Tooltip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const programsDefault: Program[] = [
	{
		id: 1,
		patient_id: 1,
		date_creation: new Date('2023-05-15'),
		last_updated: new Date('2024-03-22'),
		name: 'Renacer Infantil',
		antecedent: 'Programa para niños con traumas por separación familiar.',
		status: 'Activo',
		units: Array.from({ length: Math.ceil(Math.random() * 15) }, (_, i) => ({
			id: i + 1,
			title: `Paso ${i + 1}`,
			status: 'Activo',
			created: new Date(),
			updated: new Date(),
			responses: Array.from(
				{ length: Math.ceil(Math.random() * 5) },
				(_, j) => ({
					id: j + 1,
					title: `Respuesta ${j + 1}`,
					status: Math.random() > 0.5 ? 'Activo' : 'Completo',
				})
			),
		})),
	},
	{
		id: 2,
		patient_id: 1,

		date_creation: new Date('2022-11-03'),
		name: 'Juega y Sana',
		antecedent: 'Terapia lúdica para niños con trastornos emocionales leves.',
		last_updated: new Date('2023-01-18'),
		status: 'Completo',
		units: Array.from({ length: Math.ceil(Math.random() * 15) }, (_, i) => ({
			id: i + 1,
			title: `Paso ${i + 1}`,
			status: 'Activo',
			created: new Date(),
			updated: new Date(),
		})),
	},
	{
		id: 3,
		patient_id: 1,
		name: 'Creciendo Fuertes',
		date_creation: new Date('2021-09-10'),
		last_updated: new Date('2023-01-18'),
		antecedent:
			'Prevención y tratamiento de ansiedad en menores escolarizados.',
		status: 'Suspendido',
		units: Array.from({ length: Math.ceil(Math.random() * 15) }, (_, i) => ({
			id: i + 1,
			title: `Paso ${i + 1}`,
			status: 'Activo',
			created: new Date(),
			updated: new Date(),
		})),
	},
];

export default function ProgramSteps() {
	const [steps, setSteps] = useState<Unit[]>([]);
	const [filteredSteps, setFilteredSteps] = useState<Unit[]>([]);
	const [addStepDialogOpen, setAddStepDialogOpen] = useState(false);

	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const [menuStepId, setMenuStepId] = useState<number | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const programId = searchParams.get('programId');
		const unitId = searchParams.get('unitId');

		if (unitId) {
			// get unit by id in service
		}

		if (programId) {
			const program = programsDefault.find(
				(p) => p.id.toString() === programId
			);
			if (program?.units) {
				setSteps(program.units);
			} else {
				setSteps([]);
				setFilteredSteps([]);
			}
		}
	}, [searchParams]);

	const handleMenuOpen = (
		event: React.MouseEvent<HTMLElement>,
		stepId: number
	) => {
		setMenuAnchorEl(event.currentTarget);
		setMenuStepId(stepId);
	};

	const handleMenuClose = () => {
		setMenuAnchorEl(null);
		setMenuStepId(null);
	};

	const handleStatusChange = (status: Unit['status']) => {
		if (menuStepId !== null) {
			setSteps((prev) =>
				prev.map((step) =>
					step.id === menuStepId ? { ...step, status } : step
				)
			);
		}
		handleMenuClose();
	};

	const handleStepSelect = (step: Unit) => {
		if (step) {
			setSearchParams((searchParams) => {
				searchParams.set('unitId', step.id.toString());
				return searchParams;
			});
		}
	};

	return (
		<>
			<Box paddingRight='.5rem'>
				<Box display='flex'>
					<SearchField
						data={steps}
						searchKey='title'
						onFiltered={setFilteredSteps}
						placeholder='Buscar item'
					/>
					<Tooltip title='Agregar item' arrow>
						<IconButton
							aria-label='add item'
							size='small'
							onClick={() => {
								setAddStepDialogOpen(true);
							}}
							sx={{ marginTop: '1rem' }}
						>
							<AddIcon />
						</IconButton>
					</Tooltip>
					<DialogForm
						onSubmitSuccess={(data) => {
							console.log(data);
							const newStep: Unit = {
								id: Math.ceil(Math.random() * 150 + 10),
								program_id: 1,
								title: data,
								status: 'Activo',
								created: new Date(),
								updated: new Date(),
							};
							setSteps([...steps, newStep]);
						}}
						title='Añadir un paso'
						fieldLabel='Nombre del paso'
						open={addStepDialogOpen}
						fieldName='add-step-name'
						handleClose={() => setAddStepDialogOpen(false)}
					/>
				</Box>
				<List dense={true} sx={{ maxHeight: '25rem', overflowY: 'auto' }}>
					{filteredSteps.map((step, idx) => (
						<ListItem
							key={step.id}
							disableGutters
							sx={{
								borderRadius: 1,
								cursor: 'pointer',
								'& .MuiListItemSecondaryAction-root': {
									right: '.5rem',
								},
							}}
							secondaryAction={
								<>
									<Chip
										label={step.status}
										color={
											step.status === 'Activo'
												? 'success'
												: step.status === 'Completo'
													? 'primary'
													: step.status === 'Suspendido'
														? 'warning'
														: 'default'
										}
									/>
									<IconButton onClick={(e) => handleMenuOpen(e, step.id)}>
										<MoreVert />
									</IconButton>
								</>
							}
						>
							<ListItemButton
								selected={step.id === Number(searchParams.get('unitId'))}
								onClick={() => handleStepSelect(step)}
								sx={{
									paddingInline: '.5rem',
								}}
							>
								<ListItemText primary={step.title} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>

			<Menu
				anchorEl={menuAnchorEl}
				open={Boolean(menuAnchorEl)}
				onClose={handleMenuClose}
			>
				{(['Activo', 'Completo', 'Suspendido'] as Unit['status'][]).map(
					(status) => (
						<MenuItem key={status} onClick={() => handleStatusChange(status)}>
							{status}
						</MenuItem>
					)
				)}
			</Menu>
		</>
	);
}
