import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
	return localStorage.getItem('auth') !== null ? (
		<Outlet />
	) : (
		<Navigate to='/login' />
	);
};

export default ProtectedRoute;
