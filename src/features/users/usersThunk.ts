//@ts-ignore
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUsersThunk = createAsyncThunk(
  'users/getAll',
  async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}user`);
    
    const text = await response.text();
    console.log('Raw response:', text);
    
    if(!response.ok) {
      throw new Error('Error fetching users');
    }
    
    try {
      const data = JSON.parse(text); 
      return data;
    } catch (error) {
      throw new Error('Invalid JSON response');
    }
  }
);

