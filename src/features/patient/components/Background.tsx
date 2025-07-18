import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, IconButton, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import {
	getProgramBackground,
	updateProgramBackground,
} from '../services/patientService';

const Background = () => {
	const [antecedent, setAntecedent] = useState('');
	const [previusAntecedent, setPreviusAntecedent] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		getProgramBackground(Number(searchParams.get('programId'))).then(
			(response) => {
				if (response) {
					setAntecedent(response);
					setPreviusAntecedent(response);
				}
			}
		);
	}, [searchParams]);

	const handleEditClick = () => setIsEditing(true);

	const handleCancelClick = () => {
		setAntecedent(previusAntecedent);
		setIsEditing(false);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
		updateProgramBackground(
			Number(searchParams.get('programId')),
			antecedent
		).then(() => {
			setPreviusAntecedent(antecedent);
		});
	};

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
				value={antecedent}
				onChange={(e) => setAntecedent(e.target.value)}
				disabled={!isEditing}
				variant='outlined'
				size='small'
			/>
		</Paper>
	);
};

export default Background;
