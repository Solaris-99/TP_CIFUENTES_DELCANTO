import {
	getPatient,
	getPatientPrograms,
} from '@/features/patient/services/patientService';
import type { Patient } from '@/features/patient/types/patient';
import type { Program } from '@/features/patient/types/program';
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
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const formatDate = (date: Date | undefined) =>
	date ? date.toLocaleDateString('es-AR') : '-';

const calculateAge = (birthdate?: Date) => {
	if (!birthdate) return '-';
	const today = new Date();
	let age = today.getFullYear() - birthdate.getFullYear();
	const m = today.getMonth() - birthdate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
		age--;
	}
	return age.toString();
};

const PatientInfo = () => {
	const { patientId } = useParams();
	const [patient, setPatient] = useState<Patient | null>(null);
	const [programs, setPrograms] = useState<Program[]>([]);

	useEffect(() => {
		if (!patientId) return;

		const fetchPatient = async () => {
			try {
				const data = await getPatient(Number(patientId));
				setPatient(data);
			} catch (error) {
				console.error(error);
			}
		};

		const fetchPrograms = async () => {
			try {
				const data = await getPatientPrograms(Number(patientId));
				setPrograms(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchPatient();
		fetchPrograms();
	}, [patientId]);

	const countByStatus = (status: string) =>
		programs.filter((p) => p.status === status).length;

	if (!patient) return null;

	const items = [
		{ title: 'DNI', value: patient.dni?.toString() ?? '-', icon: <TagIcon /> },
		{
			title: 'Edad',
			value: calculateAge(patient.birthdate),
			icon: <CakeIcon />,
		},
		{
			title: 'Ingreso',
			value: formatDate(patient.date_creation),
			icon: <CalendarIcon />,
		},
	];

	return (
		<Paper variant='outlined' sx={{ padding: '1rem', height: '100%' }}>
			<Typography variant='h5' component='h2'>
				{patient.name}
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
						label={`Completos ${countByStatus('Completo')}`}
						color='success'
						variant='outlined'
					/>
					<Chip
						icon={<InfoIcon fontSize='small' />}
						label={`Activos ${countByStatus('Activo')}`}
						color='primary'
						variant='outlined'
					/>
					<Chip
						icon={<CancelInfo fontSize='small' />}
						label={`Suspendidos ${countByStatus('Suspendido')}`}
						color='warning'
						variant='outlined'
					/>
				</Stack>
			</Box>
		</Paper>
	);
};

export default PatientInfo;
