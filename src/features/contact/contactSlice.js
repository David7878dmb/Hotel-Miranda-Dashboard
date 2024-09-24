import { createSlice } from '@reduxjs/toolkit';
import { getAllThunk, getByIdThunk, createThunk, editThunk, removeThunk } from './contactThunk';
import { changeStatus, pending, rejected, promiseStatus } from '../../utils/promises';

const initialState = {
    contacts: [],
    contact: null,
    status: promiseStatus.IDLE,
    error: null
};

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Obtener todos los contactos
            .addCase(getAllThunk.pending, (state) => {
                pending(state);
            })
            .addCase(getAllThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                state.contacts = action.payload;
            })
            .addCase(getAllThunk.rejected, (state, action) => {
                rejected(state, action);
            })
            
            // Obtener un contacto por ID
            .addCase(getByIdThunk.pending, (state) => {
                pending(state);
            })
            .addCase(getByIdThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                state.contact = action.payload;
            })
            .addCase(getByIdThunk.rejected, (state, action) => {
                rejected(state, action);
            })
            
            // Crear un nuevo contacto
            .addCase(createThunk.pending, (state) => {
                pending(state);
            })
            .addCase(createThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                state.contacts.push(action.payload); 
            })
            .addCase(createThunk.rejected, (state, action) => {
                rejected(state, action);
            })
            
            // Editar un contacto existente
            .addCase(editThunk.pending, (state) => {
                pending(state);
            })
            .addCase(editThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
                if (index !== -1) {
                    state.contacts[index] = action.payload;
                }
            })
            .addCase(editThunk.rejected, (state, action) => {
                rejected(state, action);
            })
            
            // Eliminar un contacto
            .addCase(removeThunk.pending, (state) => {
                pending(state);
            })
            .addCase(removeThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
            })
            .addCase(removeThunk.rejected, (state, action) => {
                rejected(state, action);
            });
    }
});

export default contactSlice.reducer;
