import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchForecastUpcomingTwoDays, selectForecast, selectWeatherState } from './weatherSlice';
import { DateTime } from 'luxon';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	card: {
		overflow: 'revert',
		marginBottom: theme.spacing(2),
		'&:last-child': {
			marginBottom: theme.spacing(0),
		},
	},
	cover: {
		width: '100px',
		height: '100px',
	},
	detail: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: '14px',
	},
	pos: {
		fontSize: '16px',
	},
	cardContent: {
		paddingBottom: '0px',
	}
}));

export default function UpcomingForecast() {
	const weatherState = useSelector(selectWeatherState);
	const forecast = useSelector(selectForecast);
	const dispatch = useDispatch();

	useEffect(() => {
		if (weatherState === 'idle') {
			dispatch(fetchForecastUpcomingTwoDays());
		}
	}, [weatherState, dispatch]);

	return (
		<>
			<Typography variant='h5' >
				Weather forecast
			</Typography>
			<br />
			{forecast.map(hourForecast => (<Forecast
				key={hourForecast.id}
				title={hourForecast.weather}
				start={hourForecast.startDate}
				iconUrl={hourForecast.iconUrl}
				temperature={hourForecast.temperature}
			/>))}
		</>
	);
};

export function Forecast({ start, title, iconUrl, temperature }) {
	const classes = useStyles();
	const showSetLowTempButton = temperature <= -1;

	return (
		<Card
			variant='outlined'
			className={classes.card}
		>
			<div
				className={classes.detail}
			>
				<CardContent
					className={classes.cardContent}
				>
					<Typography className={classes.title} color='textSecondary' gutterBottom>
						{DateTime.fromISO(start).toLocaleString(DateTime.DATETIME_MED)}
					</Typography>
					<Typography variant='h6'>
						{temperature} °C
					</Typography>
					<Typography className={classes.pos} color='textSecondary'>
						{title}
					</Typography>
				</CardContent>
				<CardMedia
					className={classes.cover}

					image={iconUrl}
					title={`${title} Icon`}
				/>
			</div>
			<CardActions>
				{showSetLowTempButton
					? 
							<Button color='primary'>Set heating to warm</Button>
					: null
				}
			</CardActions>
		</Card>
	);
};
