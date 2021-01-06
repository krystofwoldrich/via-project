import React, { useState, useEffect } from 'react';
import {
	Select,
	Typography,
	InputLabel,
	MenuItem,
	FormControl,
	Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllHeatings, selectAllHeatings, selectHeatingState, getSelectHeating, setHeatingIdOnDashboard } from './heatingSlice';
import HeatingScheduleSingleDay from './HeatingScheduleSingleDay';
import NewHeatingScheduleButton from './NewHeatingScheduleButton';

const HeatingSummary = () => {
	const dispatch = useDispatch();
	const [heatingId, setHeatingId] = useState(null);
	const heating = useSelector(getSelectHeating(heatingId))

	const onHeatingSelectChange = id => setHeatingId(id);

	return <>
		<Typography variant='h5'>Heatings</Typography>
		<br />
		<HeatingSelect onChange={onHeatingSelectChange} />
		<br />
		{heating
			? (<>
				<Typography color='textSecondary' gutterBottom>
					{heating.description}
				</Typography>
				<Typography variant='h6'>
					Current temp: {heating.current_temperature} °C
				</Typography>
				<br />
				<NewHeatingScheduleButton variant='outlined' />
				<br />
				<HeatingScheduleSingleDay
					heatingId={heatingId}
				/>
			</>)
			: null
		}
	</>
};

export const HeatingSelect = ({ onChange }) => {
	const dispatch = useDispatch();
	const heatings = useSelector(selectAllHeatings);
	const heatingState = useSelector(selectHeatingState);
	const [value, setValue] = useState('');
	const callOnChange = (value) => {
		if (onChange) {
			onChange(value);
		}
	};

	useEffect(() => {
		if (heatings.length > 0 && value === '') {
			const heatingId = heatings[0].id;
			setValue(heatingId);
			callOnChange(heatingId)
			dispatch(setHeatingIdOnDashboard({ heatingId }));
		}
	}, [heatings]);

	const onSelectChange = (event) => {
		const heatingId = event.target.value;
		setValue(heatingId);
		callOnChange(heatingId)
		dispatch(setHeatingIdOnDashboard({ heatingId }));
	};

	useEffect(() => {
		if (heatingState === 'idle') {
			dispatch(fetchAllHeatings());
		}
	}, [dispatch, heatings, heatingState]);

	return (
		<>
			<FormControl variant="outlined">
				<InputLabel id="demo-simple-select-outlined-label">Heating</InputLabel>
				<Select
					labelId="demo-simple-select-outlined-label"
					id="demo-simple-select-outlined"
					value={value}
					onChange={onSelectChange}
					label="Heating"
					disabled={heatings.length < 1}
				>
					{heatings.map(heating => (<MenuItem
						key={heating.id}
						value={heating.id}
					>
						{heating.name}
					</MenuItem>))}
				</Select>
			</FormControl>
		</>
	);
};

export default HeatingSummary;
