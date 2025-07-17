import Background from '@/features/patient/components/Background';
import PatientInfo from '@/features/patient/components/PatientInfo';
import ProgramAssignment from '@/features/patient/components/ProgramAssignment';
import ProgramHeader from '@/features/patient/components/ProgramHeader';
import ProgramProgress from '@/features/patient/components/ProgramSteps';
import StepTracing from '@/features/patient/components/StepTracing';
import TherapistAssignment from '@/features/patient/components/TherapistAssignment';
import { Grid, Paper } from '@mui/material';

const Patient = () => {
	return (
		<>
			<Grid container spacing={2}>
				<Grid size={6}>
					<PatientInfo />
				</Grid>
				<Grid size={6}>
					<TherapistAssignment />
				</Grid>
			</Grid>
			<Grid container columns={12}>
				<Grid size={4}>
					<ProgramAssignment />
				</Grid>
				<Grid size={8}>
					<Grid
						container
						component={Paper}
						variant='outlined'
						sx={{ padding: '.5rem' }}
					>
						<Grid size={12}>
							<ProgramHeader />
						</Grid>
						<Grid size={12}>
							<Background background='Antecedente del programa' />
						</Grid>
						<Grid size={7}>
							<ProgramProgress />
						</Grid>
						<Grid size={5}>
							<StepTracing />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default Patient;
