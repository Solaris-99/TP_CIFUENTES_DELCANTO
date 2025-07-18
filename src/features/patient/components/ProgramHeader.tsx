import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { getPatientProgram } from '../services/patientService';
import type { Program } from '../types/program';

const ProgramHeader = () => {
	const [program, setProgram] = useState<Program>();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		getPatientProgram(Number(searchParams.get('programId'))).then((program) => {
			setProgram(program);
		});
	}, [searchParams]);

	return (
		<Box
			display='flex'
			flexDirection={'row'}
			justifyContent='space-between'
			width={'100%'}
			height='5rem'
		>
			<Box>
				<Typography variant='h5' fontWeight={600}>
					{program ? program.name : 'Cargando...'}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{program ? program.unit_count : 0} unidades en total
				</Typography>
			</Box>
			<Box textAlign={'right'}>
				<Typography color='error' fontWeight={600}>
					{program?.unit_completed_count}/{program?.unit_count} completados
				</Typography>
			</Box>
		</Box>
	);
};

export default ProgramHeader;
