import type { Patient } from './components/common/types/patient'
import PatientView from './components/patient/PatientView'
import { Typography } from '@mui/material'

function App() {
	const patient1: Patient = {
		id: 1,
		name: 'pepito',
		date_creation: new Date(),
	};
	const patient2: Patient = {
		id: 1,
		name: 'juanita',
		date_creation: new Date(),
	};

	const mockPatients = {
		patients: [patient1, patient2],
	};

	return (
		<>
			<Typography variant='h1'>Pasos</Typography>
			<PatientView patients={mockPatients.patients} />
		</>
	);
}

export default App;
