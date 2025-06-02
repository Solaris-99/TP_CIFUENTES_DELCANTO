import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Container,
	List,
	ListItemButton,
	Typography,
} from '@mui/material';
import type { Patient } from '../common/types/patient';

export default function PatientView(props: { patients: Patient[] }) {
	return (
		<Container>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant='h5'>Lista de pacientes</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						alignItems={'center'}
						width={'95%'}
						marginX='auto'
					>
						<Typography>{props.patients.length} Pacientes</Typography>
						<Button>Agregar paciente</Button>{' '}
						{/* El botón debería ser solo para el coordinador */}
					</Box>

					<List>
						{props.patients.map((e) => {
							return (
								<ListItemButton component='a' key={e.id} href='#'>
									{e.name}
								</ListItemButton>
							);
						})}
					</List>
				</AccordionDetails>
			</Accordion>
		</Container>
	);
}
