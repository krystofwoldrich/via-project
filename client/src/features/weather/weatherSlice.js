import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getCurrentPosition from '../location/getCurrentPosition';
import getIconUrlByWeatherId from './getIconUrlByWeatherId';

const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const fetchForecastUpcomingTwoDays = createAsyncThunk(
	'weather/fetchForecastUpcomingTwoDays',
	async () => {
		const getUrl = (api, lat, lon, units, exclude, key) => 
		`${api}/onecall?lat=${lat}&lon=${lon}&exclude=${exclude.join(',')}&units=${units}&appid=${key}`;
		
		const { coords } = await getCurrentPosition();
		
		const result = await window.fetch(getUrl(
			OPEN_WEATHER_API_URL,
			coords.latitude,
			coords.longitude,
			'metric',
			['current', 'minutely', 'daily', 'alerts'],
			API_KEY,
		));
		
		const forecast = result.json();

		return forecast;
	},
);

export const weatherSlice = createSlice({
	name: 'weather',
	initialState: {
		state: 'idle',
		forecast: {},
	},
	extraReducers: {
		[fetchForecastUpcomingTwoDays.fulfilled]: (state, action) => {
			state.forecast = mapHourlyToForecast(
				`${action.payload.lat}.${action.payload.lon}`,
				action.payload.hourly,
			).slice(0, 9);
			state.state = 'loaded';
		},
	},
});

export const mapHourlyToForecast = (prefix, hourly) => hourly.map((hour) => ({
	id: `${prefix}${hour.dt}`,
	startDate: new Date(hour.dt*1e3).toISOString(),
	temperature: hour.temp,
	weather: hour.weather[0].main,
	iconUrl: getIconUrlByWeatherId(hour.weather[0].id),
}));

export const selectForecast = state => Object.values(state.weather.forecast);

export const selectWeatherState = state => state.weather.state;

export default weatherSlice.reducer;
