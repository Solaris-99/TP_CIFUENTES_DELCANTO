import {
	addTherapistToPatient,
	getPatientTeam,
	removeTherapistFromPatient,
} from '@/features/patient/services/patientService';
import { getTherapists } from '@/features/therapist/services/therapistsService';
import type { Therapist } from '@/features/therapist/types/therapistsTypes'; // Adjust path as needed
import AddIcon from '@mui/icons-material/AddCircleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
	Avatar,
	Box,
	Chip,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Popover,
	Stack,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const TherapistAssignment = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [therapists, setTherapists] = useState<Therapist[]>([]);
	const [therapistsToAdd, setTherapistsToAdd] = useState<Therapist[]>([]);
	const { patientId } = useParams<{ patientId: string }>();

	useEffect(() => {
		if (!patientId) return;

		if (localStorage.getItem('role') === 'coordinator') {
			getTherapists().then((allTherapists) => {
				setTherapistsToAdd(allTherapists);
			});
		}

		getPatientTeam(Number(patientId))
			.then((data) => setTherapists(data))
			.catch((err) => console.error(err.message));
	}, [patientId]);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = async (id: number) => {
		if (!patientId) return;
		try {
			await removeTherapistFromPatient(Number(patientId), id);
			setTherapists((prev) => prev.filter((t) => t.id !== id));
		} catch (error) {
			console.error(error);
		}
	};

	const handleAdd = async (therapist: Therapist) => {
		if (!patientId) return;
		try {
			await addTherapistToPatient(Number(patientId), therapist.id);
			setTherapists((prev) =>
				prev.some((t) => t.id === therapist.id) ? prev : [...prev, therapist]
			);
		} catch (error) {
			console.error(error);
		}
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<Paper variant='outlined' sx={{ padding: '1rem' }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Typography variant='h5' component='h2'>
					Equipo
				</Typography>
				{localStorage.getItem('role') === 'coordinator' ? (
					<>
						<IconButton
							color='primary'
							aria-label='add person'
							aria-describedby={id}
							onClick={handleClick}
						>
							<PersonAddIcon />
						</IconButton>
						<Popover
							id={id}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
						>
							<List dense>
								{therapistsToAdd.map((therapist, idx) => {
									return therapists.some(
										(t) => t.id === therapist.id
									) ? null : (
										<>
											{idx !== 0 && (
												<Divider
													key={`divider-${therapist.id}`}
													variant='middle'
													component='li'
												/>
											)}
											<ListItem
												key={therapist.id}
												secondaryAction={
													<IconButton
														onClick={() => handleAdd(therapist)}
														edge='end'
														aria-label='add'
													>
														<AddIcon />
													</IconButton>
												}
											>
												<ListItemAvatar>
													<Avatar sx={{ width: 32, height: 32 }}>
														{therapist.name.charAt(0)}
													</Avatar>
												</ListItemAvatar>
												<ListItemText
													primary={therapist.name}
													secondary={therapist.title}
												/>
											</ListItem>
										</>
									);
								})}
							</List>
						</Popover>
					</>
				) : null}
			</Box>
			<Stack direction='row' gap={1} flexWrap={'wrap'} sx={{ marginTop: 1 }}>
				{therapists.map((therapist) => (
					<Chip
						sx={{ height: '3rem' }}
						key={therapist.id}
						avatar={<Avatar>{therapist.name.charAt(0)}</Avatar>}
						label={
							<Stack direction='column' paddingInline='.8rem'>
								<Typography variant='body1' lineHeight='1rem'>
									{therapist.name}
								</Typography>
								<Typography variant='body2' color='textSecondary'>
									{therapist.title}
								</Typography>
							</Stack>
						}
						variant='outlined'
						onDelete={() => handleDelete(therapist.id)}
					/>
				))}
			</Stack>
		</Paper>
	);
};

export default TherapistAssignment;
