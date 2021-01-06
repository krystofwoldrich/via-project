import React from 'react';
import Button from '@material-ui/core/Button';
import HeatingScheduleForm from './HeatingScheduleDialog';

export default function NewHeatingScheduleButton({ variant, onClick, children }) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		if (onClick) {
			onClick();
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button variant={variant} color="primary" onClick={handleClickOpen}>
				{children ? children : "Add new temperature"}
			</Button>
			<HeatingScheduleForm
				open={open}
				onClose={handleClose}
			/>
		</>
	)
};
