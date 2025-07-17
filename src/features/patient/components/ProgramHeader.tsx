import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import type { Program } from '../types/program';

const steps = Array.from({ length: 10 }, (_, i) => ({
	id: i + 1,
	title: `Paso ${i + 1}`,
	status: i < 5 ? 'Completo' : 'Activo', // Simulando algunos pasos completos
}));

const ProgramHeader = () => {
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
					Nombre del programa
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{steps.length} pasos en total
				</Typography>
			</Box>
			<Box textAlign={'right'}>
				<Typography color='error' fontWeight={600}>
					{steps.filter((s) => s.status === 'Completo').length}/{steps.length}{' '}
					completados
				</Typography>
			</Box>
		</Box>
	);
};

export default ProgramHeader;
