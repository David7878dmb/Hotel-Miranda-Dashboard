import { configureStore } from '@reduxjs/toolkit';
import bookingSlice from '../features/bookings/bookingsSlice';

export const store = configureStore({
  reducer: {
    booking: bookingSlice, // Sin .reducer, ya se accede directamente
  },
});