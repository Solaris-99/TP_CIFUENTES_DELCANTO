import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
	return localStorage.getItem('token') !== null ? (
		<Outlet />
	) : (
		<Navigate to='/login' />
	);
};

export default ProtectedRoute;
