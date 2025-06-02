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

export default function AccordionList(props: {
	items: ReactElement<typeof ListItemButton | typeof ListItem>[];
	title: string;
	text: string;
	addButtonText: string;
}) 
	

{
	return (
		<Container style={{margin:"1rem"}}>
			<Accordion defaultExpanded>
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
						<Typography>{props.text}</Typography>
						<Button>{props.addButtonText}</Button>
					</Box>

					<List>{props.items}</List>
				</AccordionDetails>
			</Accordion>
		</Container>
	);
}
