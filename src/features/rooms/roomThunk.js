import { createAsyncThunk } from '@reduxjs/toolkit';
import data from '../../components/json/data__rooms.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllRoomsThunk = createAsyncThunk(
  'room/getAll',
  async () => {
    await delay(1500); // Simulamos un retraso
    return data;
  }
);
