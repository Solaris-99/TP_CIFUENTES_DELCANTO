import Nav from '@/components/common/Nav';
import { Button, Container, Paper } from '@mui/material';

const NotFound = () => {
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
				<Paper style={{ padding: '1rem', textAlign: 'center' }}>
					<h1>404 - No encontrado</h1>
					<Button href='/' variant='contained'>
						Volver al inicio
					</Button>
				</Paper>
			</Container>
		</>
	);
};

export default NotFound;
