import { createSlice } from '@reduxjs/toolkit';
// @ts-ignore
import { getAllUsersThunk } from './usersThunk';
// @ts-ignore
import { changeStatus, pending, rejected, promiseStatus } from '../../utils/promises';

interface Users {
    id:number;
    name:string;
    picture:string;
    joined:Date;
    "job-desk":string;
    schedule:string[];
    contact:string;
    status:string;
}

interface UsersState{
    users:Users[];
    status:string;
    error: string | null;
}

const initialState: UsersState = {
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
