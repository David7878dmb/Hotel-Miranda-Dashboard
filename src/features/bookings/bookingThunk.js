import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../components/json/MOCK_DATA.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Thunk para obtener todas las bookings
export const getAllThunk = createAsyncThunk(
    'booking/getAll',
    async () => {
        await delay(2000);
        return data;
    }
);

// Thunk para obtener booking por ID
export const getByIdThunk = createAsyncThunk(
    'booking/getById',
    async (id) => {
        await delay(2000);
        return data.find(booking => booking.id === id) || null;
    }
);

// Thunk para crear una nueva booking
export const createThunk = createAsyncThunk(
    'booking/create',
    async (newBooking) => {
        await delay(2000);
        alert(`Booking creada: ${JSON.stringify(newBooking)}`);
        return newBooking;
    }
);

// Thunk para editar una booking
export const editThunk = createAsyncThunk(
    'booking/edit',
    async ({ id, updatedBooking }) => {
        await delay(2000); 
        const oldBooking = data.find(booking => booking.id === id) || null;
        alert(`Booking modificada: ${JSON.stringify(oldBooking)} -> ${JSON.stringify(updatedBooking)}`);
        return updatedBooking;
    }
);

// Thunk para eliminar una booking
export const removeThunk = createAsyncThunk(
    'booking/remove',
    async (id) => {
        await delay(2000);
        const deletedBooking = data.find(booking => booking.id === id) || null;
        alert(`Booking eliminada: ${deletedBooking}`);
        return id;
    }
);
