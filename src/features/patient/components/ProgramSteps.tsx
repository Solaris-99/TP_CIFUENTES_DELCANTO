import SearchField from '@/components/SearchField';
import DialogForm from '@/components/common/DialogForm';
import {
	addUnit,
	getProgramUnits,
} from '@/features/patient/services/patientService';
import type { Unit } from '@/features/patient/types/program';
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
import { useParams } from 'react-router';

export default function ProgramSteps() {
	const { patientId } = useParams();
	const [steps, setSteps] = useState<Unit[]>([]);
	const [filteredSteps, setFilteredSteps] = useState<Unit[]>([]);
	const [addStepDialogOpen, setAddStepDialogOpen] = useState(false);

	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const [menuStepId, setMenuStepId] = useState<number | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const programId = searchParams.get('programId');

		if (programId) {
			const id = Number(programId);
			if (!Number.isNaN(id)) {
				getProgramUnits(Number(patientId), id).then((units) => {
					setSteps(units);
					setFilteredSteps(units);
				});
			}
		}
	}, [searchParams, patientId]);

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
			setFilteredSteps((prev) =>
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

	const handleSubmitUnit = (data) => {
		const programId = Number(searchParams.get('programId'));
		if (!Number.isNaN(programId)) {
			addUnit(programId, data).then((newUnit) => {
				if (newUnit) {
					setSteps([...steps, newUnit]);
					setFilteredSteps([...filteredSteps, newUnit]);
				}
			});
		}
	};

	return (
		<>
			<Box paddingRight='.5rem'>
				<Box display='flex'>
					<SearchField
						data={steps}
						searchKey='name'
						onFiltered={setFilteredSteps}
						placeholder='Buscar item'
					/>
					<Tooltip title='Agregar item' arrow>
						<IconButton
							aria-label='add item'
							size='small'
							onClick={() => setAddStepDialogOpen(true)}
							sx={{ marginTop: '1rem' }}
						>
							<AddIcon />
						</IconButton>
					</Tooltip>
					<DialogForm
						onSubmitSuccess={handleSubmitUnit}
						title='Añadir un paso'
						fieldLabel='Nombre del paso'
						open={addStepDialogOpen}
						fieldName='add-step-name'
						handleClose={() => setAddStepDialogOpen(false)}
					/>
				</Box>
				<List dense sx={{ maxHeight: '25rem', overflowY: 'auto' }}>
					{filteredSteps.map((step) => (
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
								sx={{ paddingInline: '.5rem' }}
							>
								<ListItemText
									primary={step.name}
									secondary={`Inicio: ${step.date_created.toLocaleString('es-AR', { dateStyle: 'medium' })}`}
								/>
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
