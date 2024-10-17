import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SerializedError } from '@reduxjs/toolkit';
// @ts-ignore
import { getAllRoomsThunk } from './roomThunk';
// @ts-ignore
import { changeStatus, pending, rejected, promiseStatus } from '../../utils/promises';

interface Room {
    id: number;
    "room-type": string;
    number: number;
    picture: string;
    "bed-type": string;
    "room-floor": string;
    facilities: string[];
    rate: string;
    status: string;
  }
  

interface RoomState {
  rooms: Room[];
  status: string;
  error: string | null;
}

const initialState: RoomState = {
  rooms: [],
  status: promiseStatus.IDLE,
  error: null
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAllRoomsThunk.pending, (state) => {
        pending(state);
      })
      .addCase(getAllRoomsThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        changeStatus(state, promiseStatus.FULFILLED);
        state.rooms = action.payload;
      })
      .addCase(getAllRoomsThunk.rejected, (state, action) => {
        rejected(state, action);
    })
    
  }
});

export default roomSlice.reducer;