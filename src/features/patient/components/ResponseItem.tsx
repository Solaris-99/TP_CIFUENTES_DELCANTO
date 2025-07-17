import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PositiveIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CloseIcon from '@mui/icons-material/Close';
import NegativeIcon from '@mui/icons-material/HighlightOffRounded';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import NeutralIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import type { FC } from 'react';
import type { RegistryValues } from '../types/program';

interface ActionHistoryItemProps {
	type: RegistryValues;
	date: Date;
	user: string;
	onRemove?: () => void;
}

const getStyles = (type: RegistryValues) => {
	switch (type) {
		case '+':
			return {
				icon: <PositiveIcon sx={{ color: '#2e7d32' }} fontSize='small' />,
				bgColor: '#e8f5e9',
				color: '#2e7d32',
			};
		case '-':
			return {
				icon: <NegativeIcon sx={{ color: '#c62828' }} fontSize='small' />,
				bgColor: '#ffebee',
				color: '#c62828',
			};
		case 'NR':
			return {
				icon: <NeutralIcon sx={{ color: '#757575' }} fontSize='small' />,
				bgColor: '#f5f5f5',
				color: '#424242',
			};
		default:
			return {
				icon: null,
				bgColor: '#fff',
				color: '#000',
			};
	}
};

const formatDate = (date: Date): string => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	return `${day}/${month}, ${hours}:${minutes}`;
};

export const ResponseItem: FC<ActionHistoryItemProps> = ({
	type,
	date,
	user,
	onRemove,
}) => {
	const { icon, bgColor, color } = getStyles(type);
	const formattedDate = formatDate(date);

	return (
		<Paper
			variant='outlined'
			sx={{
				display: 'flex',
				alignItems: 'center',
				backgroundColor: bgColor,
				borderRadius: 1,
				px: 1,
				py: 0.5,
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
				{icon}
				<Typography sx={{ fontWeight: 400, ml: 1, fontSize: 11, color }}>
					{type}
				</Typography>
				<Typography sx={{ ml: 1, fontSize: 10 }}>{formattedDate}</Typography>
				<Typography sx={{ ml: 'auto', fontSize: 11 }}>{user}</Typography>
			</Box>
			{onRemove && (
				<IconButton size='small' onClick={onRemove}>
					<CloseIcon sx={{ fontSize: '.8rem' }} />
				</IconButton>
			)}
		</Paper>
	);
};
