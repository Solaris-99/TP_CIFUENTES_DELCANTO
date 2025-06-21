import CakeIcon from '@mui/icons-material/CakeOutlined';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import CancelInfo from '@mui/icons-material/HighlightOff';
import InfoIcon from '@mui/icons-material/InfoOutline';
import TagIcon from '@mui/icons-material/Tag';
import {
	Box,
	Chip,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	Stack,
	Typography,
} from '@mui/material';

const items = [
	{ title: 'DNI', value: '123.123.123', icon: <TagIcon /> },
	{ title: 'Edad', value: '13', icon: <CakeIcon /> },
	{ title: 'Ingreso', value: '15/01/2025', icon: <CalendarIcon /> },
];

const PatientInfo = () => {
	return (
		<Paper variant='outlined' sx={{ padding: '1rem', height: '100%' }}>
			<Typography variant='h5' component='h2'>
				Nombre del Paciente
			</Typography>
			<Box>
				<List sx={{ display: 'flex', justifyContent: 'flex-start' }}>
					{items.map((item) => (
						<ListItem key={item.title}>
							<ListItemIcon sx={{ minWidth: '2.5rem' }}>
								{item.icon}
							</ListItemIcon>
							<ListItemText primary={item.title} secondary={item.value} />
						</ListItem>
					))}
				</List>
				<Stack direction='row' gap={1}>
					<Chip
						icon={<CheckIcon fontSize='small' />}
						label='Completos 2'
						color='success'
						variant='outlined'
					/>
					<Chip
						icon={<InfoIcon fontSize='small' />}
						label='Activos 10'
						color='primary'
						variant='outlined'
					/>
					<Chip
						icon={<CancelInfo fontSize='small' />}
						label='Suspendidos 25'
						color='warning'
						variant='outlined'
					/>
				</Stack>
			</Box>
		</Paper>
	);
};

export default PatientInfo;
