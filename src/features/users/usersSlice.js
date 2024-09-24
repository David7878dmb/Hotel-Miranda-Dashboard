import { createSlice } from '@reduxjs/toolkit';
import { getAllUsersThunk } from './usersThunk';
import { changeStatus, pending, rejected, promiseStatus } from '../../utils/promises';

const initialState = {
  users: [],
  status: promiseStatus.IDLE,
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersThunk.pending, (state) => {
        pending(state);
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        changeStatus(state, promiseStatus.FULFILLED);
        state.users = action.payload;
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        rejected(state, action);
      });
  }
});

export default usersSlice.reducer;
