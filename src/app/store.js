import { configureStore } from '@reduxjs/toolkit';
import bookingSlice from '../features/bookings/bookingsSlice';
import contactReducer  from '../features/contact/contactSlice';
import roomSlice from '../features/rooms/roomSlice';

export const store = configureStore({
  reducer: {
    booking: bookingSlice,
    contact: contactReducer,
    room: roomSlice,
  },
});