import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material';
import { type FC, useState } from 'react';

type DialogFormProps = {
	title: string;
	content?: string;
	confirmButtonText?: string;
	fieldLabel: string;
	fieldName: string;
	inputType?: string;
	open: boolean;
	handleClose: () => void;
	onSubmitSuccess: (data: string) => void;
};

const DialogForm: FC<DialogFormProps> = ({
	title,
	content,
	confirmButtonText,
	onSubmitSuccess,
	fieldLabel,
	fieldName,
	inputType,
	open,
	handleClose,
}) => {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const elem = event.currentTarget[0] as HTMLInputElement;
		onSubmitSuccess(elem.value);
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle sx={{ paddingBottom: '1px' }}>{title}</DialogTitle>
			<DialogContent sx={{ paddingBottom: 0 }}>
				{content ? <DialogContentText>{content}</DialogContentText> : null}

				<form onSubmit={handleSubmit}>
					<TextField
						autoFocus
						required
						margin='dense'
						id={fieldName}
						name={fieldName}
						label={fieldLabel}
						type={inputType ? inputType : 'text'}
						fullWidth
						variant='standard'
					/>
					<DialogActions>
						<Button onClick={handleClose}>Cancelar</Button>
						<Button type='submit'>
							{confirmButtonText ? confirmButtonText : 'Confirmar'}
						</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default DialogForm;
