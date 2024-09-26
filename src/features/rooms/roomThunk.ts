import { createAsyncThunk } from '@reduxjs/toolkit';
// @ts-ignore
import data from '../../components/json/data__rooms.json';

const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const getAllRoomsThunk = createAsyncThunk(
  'room/getAll',
  async () => {
    await delay(1500);
    return data;
  }
);
