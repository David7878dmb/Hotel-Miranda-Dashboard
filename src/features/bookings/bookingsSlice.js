import { createSlice } from '@reduxjs/toolkit';
import { getAllThunk, getByIdThunk, createThunk, editThunk, removeThunk } from './bookingThunk';
import { changeStatus, pending, rejected, promiseStatus } from '../../utils/promises';

const initialState = {
    bookings: [],  // Cambié 'guests' a 'bookings'
    booking: null,
    status: promiseStatus.IDLE,
    error: null
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {}, // Podrías agregar reducers adicionales aquí si los necesitas
    extraReducers: (builder) => {
        builder
            // Obtener todas las bookings
            .addCase(getAllThunk.pending, (state) => {
                pending(state);
            })
            .addCase(getAllThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                state.bookings = action.payload;
            })
            .addCase(getAllThunk.rejected, (state, action) => {
                rejected(state, action);
            })
            
            // Obtener una booking por ID
            .addCase(getByIdThunk.pending, (state) => {
                pending(state);
            })
            .addCase(getByIdThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                state.booking = action.payload;
            })
            .addCase(getByIdThunk.rejected, (state, action) => {
                rejected(state, action);
            })
            
            // Crear una nueva booking
            .addCase(createThunk.pending, (state) => {
                pending(state);
            })
            .addCase(createThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                state.bookings.push(action.payload);
            })
            .addCase(createThunk.rejected, (state, action) => {
                rejected(state, action);
            })
            
            // Editar una booking existente
            .addCase(editThunk.pending, (state) => {
                pending(state);
            })
            .addCase(editThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
                if (index !== -1) {
                    state.bookings[index] = action.payload;
                }
            })
            .addCase(editThunk.rejected, (state, action) => {
                rejected(state, action);
            })
            
            // Eliminar una booking
            .addCase(removeThunk.pending, (state) => {
                pending(state);
            })
            .addCase(removeThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
            })
            .addCase(removeThunk.rejected, (state, action) => {
                rejected(state, action);
            });
    }
});

export default bookingSlice.reducer;