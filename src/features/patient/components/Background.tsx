import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, IconButton, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const Background = () => {
	const initialValue = 'Antecedentes del paciente';
	const [value, setValue] = useState(initialValue);
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = () => setIsEditing(true);
	const handleCancelClick = () => {
		setValue(initialValue);
		setIsEditing(false);
	};
	const handleSaveClick = () => setIsEditing(false);

	return (
		<Paper variant='outlined' sx={{ padding: '1rem', height: '100%' }}>
			<Box display='flex' justifyContent='space-between'>
				<Typography variant='h5' component='h2'>
					Antecedentes
				</Typography>
				{!isEditing ? (
					<IconButton onClick={handleEditClick}>
						<EditIcon />
					</IconButton>
				) : (
					<Box>
						<IconButton onClick={handleSaveClick}>
							<SaveIcon />
						</IconButton>
						<IconButton onClick={handleCancelClick}>
							<CancelIcon />
						</IconButton>
					</Box>
				)}
			</Box>
			<TextField
				fullWidth
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={!isEditing}
				variant='outlined'
				size='small'
			/>
		</Paper>
	);
};

export default Background;
