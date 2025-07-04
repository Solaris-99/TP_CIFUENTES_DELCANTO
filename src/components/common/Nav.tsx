import logo from '@/assets/images/logo-removebg-preview.png';
import { Box, Button, Paper } from '@mui/material';
import { AuthContext } from 'context/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router';

const Nav = () => {
	const authContext = useContext(AuthContext);

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
					<Button href='/'>Terapeutas</Button>
					<Button
						onClick={() => {
							authContext?.setToken(null);
							authContext?.setUser(null);
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
