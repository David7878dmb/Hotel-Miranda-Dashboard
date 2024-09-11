import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contactsData from '../../components/json/MOCK_DATA.json';


export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(contactsData);
      }, 1500);
    });
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    archiveBooking: (state, action) => {
      const booking = state.items.find(item => item.id === action.payload);
      if (booking) {
        booking.archived = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { archiveBooking } = bookingsSlice.actions;

export default bookingsSlice.reducer;