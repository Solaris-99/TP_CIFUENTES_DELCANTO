import './App.css';
import { Typography } from '@mui/material';
import type { Patient } from './components/common/types/patient';
import PatientView from './components/patient/PatientView';

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
