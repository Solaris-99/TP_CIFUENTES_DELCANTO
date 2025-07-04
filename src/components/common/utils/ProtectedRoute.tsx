import { AuthContext } from 'context/AuthContext';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
	const authContext = useContext(AuthContext);
	return authContext?.token !== null ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
