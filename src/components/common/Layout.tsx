import { Container } from '@mui/material';
import { Outlet } from 'react-router';
import Nav from './Nav';

const Layout = () => {
	return (
		<>
			<Nav />
			<Container
				maxWidth='lg'
				style={{ marginTop: '1rem', marginBottom: '1rem' }}
			>
				<Outlet />
			</Container>
		</>
	);
};

export default Layout;
