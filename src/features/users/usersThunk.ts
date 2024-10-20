//@ts-ignore
import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, put, del } from "../../utils/errorApi";

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

export const createUserThunk = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>(
  'users/create',
  async (newUser, { rejectWithValue }) => {
    try {
      const data = await post<User>('user', newUser);
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create user');
    }
  }
);

export const updateUserThunk = createAsyncThunk<
  User,
  { id: string; updates: Partial<User> },
  { rejectValue: string }
>(
  'users/update',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const data = await put<User>(`user/${id}`, updates);
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update user');
    }
  }
);

export const deleteUserThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'users/delete',
  async (id, { rejectWithValue }) => {
    try {
      await del(`user/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete user');
    }
  }
);
