//@ts-ignore
import { createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../utils/errorApi";


export interface User {
  id: number;
  name: string;
  picture: string;
  joined: string;
  "job-desk": string;
  schedule: string[];
  contact: string;
  status: string;
}

export const getAllUsersThunk = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>(
  'users/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await get<User[]>('user');
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);