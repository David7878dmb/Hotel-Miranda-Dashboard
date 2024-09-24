import { configureStore } from '@reduxjs/toolkit';
import bookingSlice from '../features/bookings/bookingsSlice';
import contactSlice from '../features/contact/contactSlice';
import contactReducer  from '../features/contact/contactSlice';

export const store = configureStore({
  reducer: {
    booking: bookingSlice,
    contact: contactReducer,
  },
});