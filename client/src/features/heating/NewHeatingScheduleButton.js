import React from 'react';
import Button from '@material-ui/core/Button';
import HeatingScheduleForm from './HeatingScheduleDialog';

export default function NewHeatingScheduleButton() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Add new temperature
			</Button>
			<HeatingScheduleForm
				open={open}
				onClose={handleClose}
			/>
		</>
	)
};
