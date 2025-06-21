import SearchField from '@/components/SearchField';
import { MoreVert } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import {
	Box,
	Chip,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Menu,
	MenuItem,
	Tooltip,
} from '@mui/material';
import { useState } from 'react';

interface Step {
	id: number;
	title: string;
	status: 'Activo' | 'Suspendido' | 'Completo';
}

const mockSteps: Step[] = Array.from({ length: 50 }, (_, i) => ({
	id: i + 1,
	title: `Paso ${i + 1}`,
	status: 'Activo',
}));

export default function ProgramSteps() {
	const [selectedStepId, setSelectedStepId] = useState<number | null>(null);
	const [steps, setSteps] = useState<Step[]>(mockSteps);
	const [filteredSteps, setFilteredSteps] = useState<Step[]>(mockSteps);

	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const [menuStepId, setMenuStepId] = useState<number | null>(null);

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
					{filteredSteps.map((step) => (
						<ListItem
							disableGutters
							key={step.id}
							onClick={() => setSelectedStepId(step.id)}
							sx={{
								backgroundColor:
									step.id === selectedStepId ? 'action.selected' : 'inherit',
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
							<ListItemText primary={step.title} />
						</ListItem>
					))}
				</List>
			</Box>

			{/* Status Menu */}
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
