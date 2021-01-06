import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
	Card,
	CardHeader,
	CardActions,
	CardContent,
	Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingEvents, selectCalendarState, selectEvents } from './calendarSlice';
import { selectIsAuth2SignIn } from '../auth/authSlice';
import { DateTime } from 'luxon';
import Skeleton from '@material-ui/lab/Skeleton';
import NewHeatingScheduleButton from '../heating/NewHeatingScheduleButton';
import { updateNewSchedule } from '../heating/heatingSlice';
import { toISOOptions } from './dateTimeOptions';

const DEFAULT_AWAY_TEMP = 17;

const useStyles = makeStyles((theme) => ({
	card: {
		overflow: 'revert',
		marginBottom: theme.spacing(2),
		'&:last-child': {
			marginBottom: theme.spacing(0),
		}
	},
	cardHeader: {
		fontSize: '14px',
	},
	cardContent: {
		paddingBottom: '0px',
	}
}));

export default function UpcomingEvents() {
  const isAuth2SignIn = useSelector(selectIsAuth2SignIn);
	const events = useSelector(selectEvents);
	const calendarStatus = useSelector(selectCalendarState);
	const dispatch = useDispatch();

	useEffect(() => {
		if (calendarStatus === 'idle') {
			dispatch(fetchUpcomingEvents());
		}
	}, [isAuth2SignIn, calendarStatus, dispatch]);

	return (
		<>
			<Typography variant='h5' >
				Upcoming events
			</Typography>
			<br />
			{calendarStatus === 'idle'
				? <>
					<Skeleton width="40%" height="40px" style={{ marginBottom: 0 }} />
					<Skeleton height="60px" style={{ marginBottom: 0 }} />
					<Skeleton width="20%" height="40px" style={{ marginBottom: 6 }} />
					<Skeleton width="40%" height="40px" style={{ marginBottom: 0 }} />
					<Skeleton height="60px" style={{ marginBottom: 0 }} />
					<Skeleton width="20%" height="40px" style={{ marginBottom: 6 }} />
					<Skeleton width="40%" height="40px" style={{ marginBottom: 0 }} />
					<Skeleton height="60px" style={{ marginBottom: 0 }} />
					<Skeleton width="20%" height="40px" style={{ marginBottom: 6 }} />
				</>
				: events.map(event => (<Event
					key={event.id}
					title={event.title}
					start={event.startDate}
					end={event.endDate}
				/>))
			}
		</>
	);
}

export function Event({ start, end, title }) {
	const dispatch = useDispatch();
	const classes = useStyles();

	const handleSetNewHeatingSchedule = () => {
		dispatch(updateNewSchedule({
			temperature: DEFAULT_AWAY_TEMP,
			from: DateTime.fromISO(start).toISO(toISOOptions),
			to: DateTime.fromISO(end).toISO(toISOOptions),
		}));
	};

	return (
		<Card
			variant='outlined'
			className={classes.card}
		>
			<CardContent
				className={classes.cardContent}
			>
				<Typography className={classes.cardHeader} color='textSecondary' gutterBottom>
					{DateTime.fromISO(start).toLocaleString(DateTime.DATETIME_MED)}
				</Typography>
				<Typography variant='h6'>
					{title}
				</Typography>
				<Typography className={classes.cardHeader} color='textSecondary' gutterBottom>
					{DateTime.fromISO(end).toLocaleString(DateTime.DATETIME_MED)}
				</Typography>
			</CardContent>
			<CardActions>
				<NewHeatingScheduleButton color='primary' onClick={handleSetNewHeatingSchedule}>Set heating to away</NewHeatingScheduleButton>
      </CardActions>
		</Card>
	)
}
