import {
	addRegistry,
	deleteRegistry,
	getRegistry,
} from '@/features/patient/services/patientService';
import type {
	Registry,
	RegistryValues,
} from '@/features/patient/types/program';
import { Delete } from '@mui/icons-material';
import PositiveIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import NegativeIcon from '@mui/icons-material/HighlightOffRounded';
import NeutralIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import {
	Box,
	Divider,
	IconButton,
	Stack,
	Tab,
	Tabs,
	Typography,
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { ResponseItem } from './ResponseItem';

const StepTracing = () => {
	const { patientId } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

	const [notes, setNotes] = useState<Registry[]>([]);
	const [tabIndex, setTabIndex] = useState(0);

	useEffect(() => {
		const programId = searchParams.get('programId');
		const unitId = searchParams.get('unitId');

		if (patientId && programId && unitId) {
			getRegistry(+patientId, +programId, +unitId)
				.then((data) => {
					setNotes(data);
				})
				.catch(console.error);
		}
	}, [searchParams, patientId]);

	const handleAddNote = async (type: RegistryValues) => {
		const programId = searchParams.get('programId');
		const unitId = searchParams.get('unitId');
		if (!patientId || !programId || !unitId) return;
		try {
			await addRegistry(+patientId, +programId, +unitId, type);
			const updated = await getRegistry(+patientId, +programId, +unitId);
			setNotes(updated);
		} catch (err) {
			console.error(err);
		}
	};

	const handleDeleteNote = async (id: number) => {
		const programId = searchParams.get('programId');
		const unitId = searchParams.get('unitId');
		if (!patientId || !programId || !unitId) return;
		try {
			await deleteRegistry(+patientId, +programId, +unitId, id);
			setNotes((prev) => prev.filter((note) => note.id !== id));
		} catch (err) {
			console.error(err);
		}
	};

	const filteredNotes =
		tabIndex === 0
			? notes
			: notes.filter((n) =>
					tabIndex === 1
						? n.value === '+'
						: tabIndex === 2
							? n.value === 'NR'
							: tabIndex === 3
								? n.value === '-'
								: true
				);

	const getTabLabel = (value: RegistryValues) =>
		notes.filter((n) => n.value === value).length;

	return (
		<Box flex={1.5}>
			<Typography variant='subtitle1' mb={1}>
				Registro de respuesta
			</Typography>
			<Stack
				direction='row'
				spacing={1}
				alignItems='center'
				justifyContent='space-evenly'
				divider={<Divider variant='middle' orientation='vertical' flexItem />}
			>
				<IconButton
					aria-label='positive'
					sx={{ color: green[400] }}
					onClick={() => handleAddNote('+')}
				>
					<PositiveIcon />
				</IconButton>
				<IconButton
					aria-label='neutral'
					sx={{ color: grey[400] }}
					onClick={() => handleAddNote('NR')}
				>
					<NeutralIcon />
				</IconButton>
				<IconButton
					aria-label='negative'
					sx={{ color: red[400] }}
					onClick={() => handleAddNote('-')}
				>
					<NegativeIcon />
				</IconButton>
			</Stack>

			<Typography variant='subtitle2' mb={1}>
				Historial
			</Typography>
			<Tabs
				value={tabIndex}
				onChange={(_, val) => setTabIndex(val)}
				variant='standard'
				sx={{
					width: '100%',
					minHeight: 36,
					'& .MuiTabs-flexContainer': {
						display: 'flex',
						justifyContent: 'space-around',
					},
				}}
			>
				<Tab label='Todos' sx={{ minHeight: 36 }} />
				<Tab
					icon={<PositiveIcon fontSize='small' />}
					iconPosition='start'
					label={getTabLabel('+')}
					sx={{ minHeight: 36 }}
				/>
				<Tab
					icon={<NeutralIcon fontSize='small' />}
					iconPosition='start'
					label={getTabLabel('NR')}
					sx={{ minHeight: 36 }}
				/>
				<Tab
					icon={<NegativeIcon fontSize='small' />}
					iconPosition='start'
					label={getTabLabel('-')}
					sx={{ minHeight: 36 }}
				/>
			</Tabs>

			<Stack ml={1} mt={2} spacing={0.2}>
				{filteredNotes
					.sort(
						(a, b) =>
							new Date(b.date_created).getTime() -
							new Date(a.date_created).getTime()
					)
					.map((note) => (
						<ResponseItem
							key={note.id}
							type={note.value}
							date={new Date(note.date_created)}
							user={`ID ${note.therapist_id}`}
							onRemove={() => handleDeleteNote(note.id)}
						/>
					))}
			</Stack>
		</Box>
	);
};

export default StepTracing;
