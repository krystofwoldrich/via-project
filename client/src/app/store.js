import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import calendarReducer from '../features/calendar/calendarSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    calendar: calendarReducer,
  },
});
