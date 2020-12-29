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
	const classes = useStyles();

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
				<Button color='primary'>Set heating to away</Button>
      </CardActions>
		</Card>
	)
}
