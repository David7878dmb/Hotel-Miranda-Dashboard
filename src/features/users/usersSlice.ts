//@ts-ignore
import { createSlice } from '@reduxjs/toolkit';
// @ts-ignore
import { getAllUsersThunk, getUserByIdThunk, User } from './usersThunk';
// @ts-ignore
import { changeStatus, pending, rejected, promiseStatus } from '../../utils/promises';
import { PayloadAction } from '../../../node_modules/@reduxjs/toolkit/dist/index';

interface UsersState {
  users: User[];
  currentUser: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
  status: 'idle',
  error: null,
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder:any) => {
    builder
      .addCase(getAllUsersThunk.pending, (state:any) => {
        state.status = 'loading';
      })
      .addCase(getAllUsersThunk.fulfilled, (state:any, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(getAllUsersThunk.rejected, (state:any, action:any) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to fetch users';
      })
      .addCase(getUserByIdThunk.pending, (state:any) => {
        state.status = 'loading';
        state.currentUser = null;
      })
      .addCase(getUserByIdThunk.fulfilled, (state:any, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(getUserByIdThunk.rejected, (state:any, action:any) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to fetch user';
        state.currentUser = null;
      });
  },
});

export default usersSlice.reducer;