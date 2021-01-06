import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import { DateTimePicker } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { saveHeatingScheduleItem, selectNewSchedule, updateNewSchedule, selectHeatingIdOnDashboard } from './heatingSlice';
import { DateTime, Duration } from 'luxon';
import { toISOOptions } from '../calendar/dateTimeOptions';

const DEFAULT_TEMPERATURE = 20;

const defaultTimeToOffset = { hours: 1 };

const useStyles = makeStyles((theme) => ({
	form: {
		'& > *': {
			marginBottom: '16px',
		},
		'& > *:last-child': {
			marginBottom: '0px',
		},
	},
}));

export default function HeatingScheduleDialog({ open, onClose }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const schedule = useSelector(selectNewSchedule);
	const heatingId = useSelector(selectHeatingIdOnDashboard);

	const onScheduleChange = (newPartialSchedule) => {
		dispatch(updateNewSchedule(newPartialSchedule));
	};
	const onTemperatureChange = (event) => {
		const temperature = parseInt(event.target.value);
		onScheduleChange({ temperature });
	};
	const onFromChange = (from) => {
		const fromIso = from.toISO();
		onScheduleChange({ from: fromIso });
	};
	const onToChange = (to) => {
		const toIso = to.toISO();
		onScheduleChange({ to: toIso });
	};

	const callOnClose = () => {
		if (onClose) {
			onClose();
		}
	};
	const localOnClose = () => {
		callOnClose();
	};
	const localOnSave = () => {
		if (schedule.temperature && schedule.from && schedule.to) {
			dispatch(saveHeatingScheduleItem({ heatingId, scheduleItem: schedule }));
			callOnClose();
		}
	};

	useEffect(() => {
		if (!schedule.temperature) {
			onScheduleChange({ temperature: DEFAULT_TEMPERATURE });
		}
		if (!schedule.from) {
			onScheduleChange({ from: DateTime.local().toISO(toISOOptions) });
		}
		if (!schedule.to) {
			onScheduleChange({ to: DateTime.local().plus(defaultTimeToOffset).toISO(toISOOptions) });
		}
	}, [schedule, dispatch]);

	return (
		<Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Schedule temperature</DialogTitle>
			<DialogContent>
				<DialogContentText>
					To schedule temperature on given heating set the temp value in °C and set from and to date and time when the heating should hold this value.
				</DialogContentText>
				<br />
				<div className={classes.form}>
					<TextField
						autoFocus
						id="temperature"
						label="Temperature"
						type="number"
						variant='outlined'
						fullWidth
						InputProps={{
							endAdornment: <InputAdornment position="start">°C</InputAdornment>,
						}}
						value={schedule.temperature || ''}
						onChange={onTemperatureChange}
					/>
					<DateTimePicker
						id="from"
						label="From"
						inputVariant="outlined"
						value={schedule.from}
						onChange={onFromChange}
						fullWidth
					/>
					<DateTimePicker
						id='to'
						label="To"
						inputVariant="outlined"
						value={schedule.to}
						onChange={onToChange}
						fullWidth
					/>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={localOnClose} color="primary">
					Cancel
				</Button>
				<Button onClick={localOnSave} color="primary">
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}
