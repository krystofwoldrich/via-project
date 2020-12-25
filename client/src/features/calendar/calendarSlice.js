import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUpcomingEvents = createAsyncThunk(
  'calendar/fetchUpcomingEvents',
  async () => {
    const response = await window.gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });
    const events = response.result.items;

    return events;
  },
);

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    state: 'idle',
    events: [],
  },
  extraReducers: {
    [fetchUpcomingEvents.fulfilled]: (state, action) => {
      state.events = mapItemsToEvents(action.payload);
      state.state = 'loaded';
    }
  },
});

export const {} = calendarSlice.actions;

export const mapItemsToEvents = (items) => {
  return items.map((item) => ({
    id: item.id,
    startDate: item.start.dateTime ? item.start.dateTime : item.start.date,
    endDate: item.end.dateTime ? item.end.dateTime : item.end.date,
    title: item.summary,
  }));
}

export const selectEvents = state => state.calendar.events;

export const selectCalendarState = state => state.calendar.state;

export default calendarSlice.reducer;
