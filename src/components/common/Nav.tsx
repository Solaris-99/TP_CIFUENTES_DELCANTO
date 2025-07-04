import logo from '@/assets/images/logo-removebg-preview.png';
import { Box, Button, Paper } from '@mui/material';
import { AuthContext } from 'context/AuthContext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';

const Nav = () => {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	return (
		<Paper elevation={2} style={{ width: '100vw' }}>
			<Box
				style={{
					display: 'flex',
					width: '95%',
					justifyContent: 'space-between',
					position: 'sticky',
					top: 0,
					left: 0,
					marginLeft: 'auto',
					marginRight: 'auto',
					zIndex: 999,
				}}
			>
				<Link to='/'>
					<img src={logo} alt='Pasos' height={64} width={64} />
				</Link>
				<Box display={'flex'} height={'fit-content'} marginY={'auto'}>
					<Button href='/'>Pacientes</Button>

					{localStorage.getItem('role') ? (
						<Button href='/therapist'>Terapeutas</Button>
					) : null}
					<Button
						onClick={() => {
							localStorage.removeItem('token');
							authContext?.setUser(null);
							navigate('/login');
						}}
					>
						Salir
					</Button>
				</Box>
			</Box>
		</Paper>
	);
};

export default Nav;
