import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Patient from '@/pages/Patient';
import { BrowserRouter, Route, Routes } from 'react-router';
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
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
