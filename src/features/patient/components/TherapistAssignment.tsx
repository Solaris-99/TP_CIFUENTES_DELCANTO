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
import { useState } from 'react';

const therapists = [
	{ id: 1, name: 'Dr. Smith', specialty: 'Cardiology' },
	{ id: 2, name: 'Dr. Johnson', specialty: 'Neurology' },
	{ id: 3, name: 'Dr. Lee', specialty: 'Pediatrics' },
];

const TherapistAssignment = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = (id) => {
		console.log(`Delete therapist with id: ${id}`);
		// Implement delete logic here
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
				<IconButton
					color='primary'
					aria-label='add an person'
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
					<List dense={true}>
						{therapists.map((therapist, idx) => (
							<>
								{idx !== 0 && (
									<Divider key={therapist.id} variant='middle' component='li' />
								)}
								<ListItem
									key={therapist.id}
									secondaryAction={
										<IconButton edge='end' aria-label='add'>
											<AddIcon />
										</IconButton>
									}
								>
									<ListItemAvatar>
										<Avatar sx={{ width: 32, height: 32 }}>AC</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={therapist.name}
										secondary='Specialty'
									/>
								</ListItem>
							</>
						))}
					</List>
				</Popover>
			</Box>
			<Stack direction='row' gap={1} flexWrap={'wrap'} sx={{ marginTop: 1 }}>
				{therapists.map((therapist) => (
					<Chip
						sx={{ height: '3rem' }}
						key={therapist.id}
						avatar={<Avatar>{therapist.name.charAt(0)}</Avatar>}
						/* label={`${therapist.name}`} */
						label={
							<Stack direction='column' paddingInline='.8rem'>
								<Typography variant='body1' lineHeight='1rem'>
									{therapist.name}
								</Typography>
								<Typography variant='body2' color='textSecondary'>
									{therapist.specialty}
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
