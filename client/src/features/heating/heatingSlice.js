import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doRequest } from '../../api/api';

export const fetchAllHeatings = createAsyncThunk(
	'heating/fetchAllHeatings',
	async () => {
		const result = await doRequest('heating', 'GET');
		return result;
	},
);

export const fetchHeatingSchedule = createAsyncThunk(
	'heating/fetchHeatingSchedule',
	async ({ heatingId }) => {
		const result = await doRequest(`heating/${heatingId}/schedule`, 'GET');
		return {heatingId, result};
	},
)

export const saveHeatingScheduleItem = createAsyncThunk(
	'heating/saveHeatingScheduleItem',
	async ({ heatingId, scheduleItem }) => {
		const method = scheduleItem.id ? 'PUT' : 'POST';
		const savedScheduleItem = await doRequest(`heating/${heatingId}/schedule`, method, JSON.stringify(scheduleItem));
		return { heatingId, scheduleItem: savedScheduleItem };
	},
);

export const removeHeatingScheduleItem = createAsyncThunk(
	'heating/removeHeatingScheduleItem',
	async ({ heatingId, deletedId }) => {
		if (heatingId && deletedId) {
			//TODO: send to the server
			return { heatingId, scheduleItem: { id: deletedId } };
		} else {
			throw Error('Missing heating it and schedule item');
		}
	}
)

export const heatingSlice = createSlice({
	name: 'heating',
	initialState: {
		heatingState: 'idle',
		heatings: {},
		newSchedule: {},
		heatingIdOnDashboard: undefined,
	},
	reducers: {
		updateNewSchedule: (state, action) => {
			state.newSchedule = {
				...state.newSchedule,
				...action.payload,
			};
		},
		setHeatingIdOnDashboard: (state, action) => {
			state.heatingIdOnDashboard = action.payload.heatingId;
		},
	},
	extraReducers: {
		[fetchAllHeatings.pending]: state => {
			state.heatingState = 'loading';
		},
		[fetchAllHeatings.fulfilled]: (state, action) => {
			state.heatings = action.payload.reduce((prev, current) => {
				return {
					...prev,
					[current._id]: current,
				};
			}, {});
			state.heatingState = 'loaded';
		},
		[fetchAllHeatings.rejected]: (state) => {
			state.heatingState = 'failed';
		},
		[fetchHeatingSchedule.fulfilled]: (state, action) => {
			console.log(state);
			const heatingId = action.payload.heatingId;
			const heatingSchedule = action.payload.result;
			state.heatings[heatingId].schedule = heatingSchedule.reduce((prev, current) => ({ ...prev, [current._id]: current }), {});
		},
		[saveHeatingScheduleItem.fulfilled]: (state, action) => {
			const { heatingId, scheduleItem } = action.payload;
			const oldSchedule = state.heatings[heatingId].schedule
			state.heatings[heatingId].schedule = {
				...oldSchedule,
				[scheduleItem._id]: scheduleItem,
			};
		},
		[removeHeatingScheduleItem.fulfilled]: (state, action) => {
			const { heatingId, scheduleItem } = action.payload;
			delete state.heatings[heatingId].schedule[scheduleItem._id];
		},
	},
});

export const selectHeatingState = state => state.heating.heatingState;

export const selectAllHeatings = state => Object.values(state.heating.heatings);

export const getSelectHeating = id => state => id ? state.heating.heatings[id] : null;

export const selectNewSchedule = state => state.heating.newSchedule;

export const selectHeatingIdOnDashboard = state => state.heating.heatingIdOnDashboard;

export const getSelectHeatingSchedule = id => state => id &&
	state.heating.heatings[id] &&
	state.heating.heatings[id].schedule ? Object.values(state.heating.heatings[id].schedule) : null

export const { updateNewSchedule, setHeatingIdOnDashboard } = heatingSlice.actions;

export default heatingSlice.reducer;
