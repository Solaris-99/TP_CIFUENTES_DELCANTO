import Nav from '@/components/common/Nav';
import { Container } from '@mui/material';
import { Outlet } from 'react-router';

const Layout = () => {
	return (
		<>
			<Nav />
			<Container
				maxWidth='lg'
				style={{
					marginTop: '1rem',
					marginBottom: '1rem',
				}}
			>
				<Outlet />
			</Container>
		</>
	);
};

export default Layout;
