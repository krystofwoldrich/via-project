import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import calendarReducer from '../features/calendar/calendarSlice';
import weatherReducer from '../features/weather/weatherSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    calendar: calendarReducer,
    weather: weatherReducer,
  },
});
