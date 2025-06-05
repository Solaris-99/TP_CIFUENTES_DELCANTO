import { BrowserRouter, Route, Routes } from 'react-router';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import Patient from '../../pages/Patient';
import Program from '../../pages/Program';
import Layout from './Layout';
import ProtectedRoute from './utils/ProtectedRoute';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='*' element={<NotFound />} />
				<Route element={<ProtectedRoute />}>
					<Route path='/' element={<Layout />}>
						<Route index element={<Home />} />
						<Route path='/:patientId' element={<Patient />} />
						<Route path='/:patientId/:programId' element={<Program />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
