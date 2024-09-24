import { createSlice } from '@reduxjs/toolkit';
import { getAllRoomsThunk } from './roomThunk';
import { changeStatus, pending, rejected, promiseStatus } from '../../utils/promises';

const initialState = {
  rooms: [],
  status: promiseStatus.IDLE,
  error: null
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoomsThunk.pending, (state) => {
        pending(state);
      })
      .addCase(getAllRoomsThunk.fulfilled, (state, action) => {
        changeStatus(state, promiseStatus.FULFILLED);
        state.rooms = action.payload;
      })
      .addCase(getAllRoomsThunk.rejected, (state, action) => {
        rejected(state, action);
      });
  }
});

export default roomSlice.reducer;
