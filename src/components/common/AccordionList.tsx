import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Container,
	List,
	type ListItem,
	type ListItemButton,
	Typography,
} from '@mui/material';
import type { ReactElement } from 'react';

const AccordionList = (props: {
	items: ReactElement<typeof ListItemButton | typeof ListItem>[];
	title: string;
	text?: string;
	defaultExpanded?: boolean;
	addButton?: boolean;
	buttonFunction?: React.MouseEventHandler;
}) => {
	return (
		<Container style={{ margin: '1rem' }}>
			<Accordion defaultExpanded={props.defaultExpanded}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant='h5'>{props.title}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						alignItems={'center'}
						width={'95%'}
						marginX='auto'
					>
						{props.text !== null ? <Typography>{props.text}</Typography> : null}
						{props.addButton && props.buttonFunction ? (
							<Button variant='outlined' onClick={props.buttonFunction}>
								Agregar
							</Button>
						) : null}
					</Box>

					<List>{props.items}</List>
				</AccordionDetails>
			</Accordion>
		</Container>
	);
};

export default AccordionList;
