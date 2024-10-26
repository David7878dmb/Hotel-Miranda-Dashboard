//@ts-ignore
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//@ts-ignore
import { UsersState, User } from './usersTypes'; 
import { getAllUsersThunk, createUserThunk, updateUserThunk, deleteUserThunk } from './usersThunk';

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
   
  },
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
        state.error = action.error.message || 'Failed to fetch users';
      })

      // Create User Thunk
      .addCase(createUserThunk.fulfilled, (state:any, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      .addCase(createUserThunk.rejected, (state:any, action: PayloadAction<string | null>) => {
        state.error = action.payload;
      })

      // Update User Thunk
      .addCase(updateUserThunk.fulfilled, (state:any, action: PayloadAction<User>) => {
        const index = state.users.findIndex((user: User) => user.id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUserThunk.rejected, (state:any, action: PayloadAction<string | null>) => {
        state.error = action.payload;
      })

      // Delete User Thunk
      .addCase(deleteUserThunk.fulfilled, (state:any, action: PayloadAction<string>) => {
        state.users = state.users.filter((user: User) => user.id !== action.payload);
      })
      .addCase(deleteUserThunk.rejected, (state:any, action: PayloadAction<string | null>) => {
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
