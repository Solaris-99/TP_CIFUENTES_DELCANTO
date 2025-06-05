import LoginForm from 'features/auth/components/LoginForm';
import type { FC } from 'react';
import { useNavigate } from 'react-router';

const Login: FC = () => {
	const navigate = useNavigate();

	return (
		<>
			<LoginForm onSubmitSuccess={() => navigate('/')} />
		</>
	);
};

export default Login;
