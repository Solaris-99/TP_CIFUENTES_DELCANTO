import { Delete } from '@mui/icons-material';
import PositiveIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import NegativeIcon from '@mui/icons-material/HighlightOffRounded';
import NeutralIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import {
	Box,
	Card,
	CardContent,
	Chip,
	Divider,
	IconButton,
	Paper,
	Stack,
	Tab,
	Tabs,
	Typography,
	styled,
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useState } from 'react';
import { type ActionType, ResponseItem } from './ResponseItem';

interface Note {
	id: number;
	stepId: number;
	content: ActionType;
	date: Date;
	therapist: string;
}

const step = {
	title: 'titulo del paso',
};

const StepTracing = () => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [tabIndex, setTabIndex] = useState(0);

	const handleAddNote = (type: ActionType) => {
		setNotes((prev) => [
			{
				id: Date.now(),
				stepId: 1,
				content: type,
				date: new Date(),
				therapist: 'Cristian D.',
			},
			...prev,
		]);
	};

	const handleDeleteNote = (id: number) => {
		setNotes((prev) => prev.filter((note) => note.id !== id));
	};

	const selectedNotes = notes
		.filter((note) => note.stepId === 1)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

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
					onClick={() => handleAddNote('Pos')}
				>
					<PositiveIcon />
				</IconButton>
				<IconButton
					aria-label='neutral'
					sx={{ color: grey[400] }}
					onClick={() => handleAddNote('N/R')}
				>
					<NeutralIcon />
				</IconButton>
				<IconButton
					aria-label='negative'
					sx={{ color: red[400] }}
					onClick={() => handleAddNote('Neg')}
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
					gap: 0,
					width: '100%',
					minHeight: 36,
					'& .MuiTabs-flexContainer': {
						display: 'flex',
						justifyContent: 'space-around',
						gap: 0,
					},
				}}
			>
				<Tab
					label='Todos'
					disableRipple
					sx={{
						minHeight: 36,
						height: 36,
						minWidth: 'auto',
						padding: '0 4px',
						flexShrink: 1,
						'&.MuiButtonBase-root': {
							minWidth: 'unset',
						},
					}}
				/>
				<Tab
					icon={<PositiveIcon fontSize='small' />}
					iconPosition='start'
					label='1'
					disableRipple
					sx={{
						minHeight: 36,
						height: 36,
						minWidth: 'auto',
						padding: '0 4px',
						flexShrink: 1,
						'&.MuiButtonBase-root': {
							minWidth: 'unset',
						},
					}}
				/>
				<Tab
					icon={<NeutralIcon fontSize='small' />}
					iconPosition='start'
					label='1'
					disableRipple
					sx={{
						minHeight: 36,
						height: 36,
						minWidth: 'auto',
						padding: '0 4px',
						flexShrink: 1,
						'&.MuiButtonBase-root': {
							minWidth: 'unset',
						},
					}}
				/>
				<Tab
					icon={<NegativeIcon fontSize='small' />}
					iconPosition='start'
					label='1'
					disableRipple
					sx={{
						minHeight: 36,
						height: 36,
						minWidth: 'auto',
						padding: '0 4px',
						flexShrink: 1,
						'&.MuiButtonBase-root': {
							minWidth: 'unset',
						},
					}}
				/>
			</Tabs>

			{step !== null && (
				<Stack ml={1} mt={2} spacing={0.2}>
					{selectedNotes.map((note) => (
						<ResponseItem
							key={note.id}
							type={note.content}
							date={note.date}
							user={note.therapist}
							onRemove={() => {}}
						/>
					))}
				</Stack>
			)}
		</Box>
	);
};

export default StepTracing;
