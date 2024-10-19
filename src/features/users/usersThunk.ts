//@ts-ignore
import { createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../utils/errorApi";

export interface User {
  id: string;  // Cambiado a string para manejar ObjectId
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

export const getUserByIdThunk = createAsyncThunk<
  User,
  string,  // Cambiado a string para manejar ObjectId
  { rejectValue: string }
>(
  'users/getById',
  async (id, { rejectWithValue }) => {
    if (!id) {
      return rejectWithValue('Invalid user ID');
    }
    try {
      const data = await get<User>(`user/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);