import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../components/json/data__users.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const delaytime = 1500;

export const getAllUsersThunk = createAsyncThunk(
  'users/getAll',
  async () => {
    await delay(delaytime);
    return data;
  }
);
