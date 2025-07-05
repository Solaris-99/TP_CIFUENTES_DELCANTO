import SearchField from '@/components/SearchField';
import type { Program, Step } from '@/components/common/types/program';
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
		dateCreation: new Date('2023-05-15'),
		lastUpdated: new Date('2024-03-22'),
		name: 'Renacer Infantil',
		antecedent: 'Programa para niños con traumas por separación familiar.',
		status: 'Activo',
		steps: Array.from({ length: Math.ceil(Math.random() * 15) }, (_, i) => ({
			id: i + 1,
			title: `Paso ${i + 1}`,
			status: 'Activo',
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
		dateCreation: new Date('2022-11-03'),
		name: 'Juega y Sana',
		antecedent: 'Terapia lúdica para niños con trastornos emocionales leves.',
		lastUpdated: new Date('2023-01-18'),
		status: 'Completo',
		steps: Array.from({ length: Math.ceil(Math.random() * 15) }, (_, i) => ({
			id: i + 1,
			title: `Paso ${i + 1}`,
			status: 'Activo',
		})),
	},
	{
		id: 3,
		name: 'Creciendo Fuertes',
		dateCreation: new Date('2021-09-10'),
		lastUpdated: new Date('2023-01-18'),
		antecedent:
			'Prevención y tratamiento de ansiedad en menores escolarizados.',
		status: 'Suspendido',
		steps: Array.from({ length: Math.ceil(Math.random() * 15) }, (_, i) => ({
			id: i + 1,
			title: `Paso ${i + 1}`,
			status: 'Activo',
		})),
	},
];

export default function ProgramSteps() {
	const [steps, setSteps] = useState<Step[]>([]);
	const [filteredSteps, setFilteredSteps] = useState<Step[]>([]);

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
			if (program?.steps) {
				setSteps(program.steps);
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

	const handleStatusChange = (status: Step['status']) => {
		if (menuStepId !== null) {
			setSteps((prev) =>
				prev.map((step) =>
					step.id === menuStepId ? { ...step, status } : step
				)
			);
		}
		handleMenuClose();
	};

	const handleStepSelect = (step: Step) => {
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
							onClick={() => {}}
							sx={{ marginTop: '1rem' }}
						>
							<AddIcon />
						</IconButton>
					</Tooltip>
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
				{(['Activo', 'Completo', 'Suspendido'] as Step['status'][]).map(
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
