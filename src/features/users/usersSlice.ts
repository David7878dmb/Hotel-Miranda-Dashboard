//@ts-ignore
import { createSlice } from '@reduxjs/toolkit';
// @ts-ignore
import { getAllUsersThunk, User } from './usersThunk';
// @ts-ignore
import { changeStatus, pending, rejected, promiseStatus } from '../../utils/promises';
import { PayloadAction } from '../../../node_modules/@reduxjs/toolkit/dist/index';


interface UsersState {
  users: User[];
  status: string;
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
  extraReducers: (builder: any) => {
    builder
      .addCase(getAllUsersThunk.pending, (state : any) => {
        pending(state);
      })
      .addCase(getAllUsersThunk.fulfilled, (state : any, action: PayloadAction<User[]>) => {
        changeStatus(state, promiseStatus.FULFILLED);
        state.users = action.payload;
      })
      .addCase(getAllUsersThunk.rejected, (state : any, action : any) => {
        rejected(state, action);
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message || 'An unknown error occurred';
        }
      });
  }
});

export default usersSlice.reducer;