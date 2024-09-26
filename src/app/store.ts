import { configureStore } from '@reduxjs/toolkit';
// @ts-ignore
import bookingSlice from '../features/bookings/bookingsSlice';
// @ts-ignore
import contactReducer  from '../features/contact/contactSlice';
// @ts-ignore
import roomSlice from '../features/rooms/roomSlice';
// @ts-ignore
import usersSlice from '../features/users/usersSlice';


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    booking: bookingSlice,
    contact: contactReducer,
    room: roomSlice,
    users: usersSlice,
  },
});

export type AppStore = typeof store