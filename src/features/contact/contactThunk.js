import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../components/json/MOCK_DATA.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const delaytime = 1500;

// Thunk para obtener todos los contactos
export const getAllThunk = createAsyncThunk(
    'contact/getAll',
    async () => {
        await delay(delaytime);
        return data;
    }
);

// Thunk para obtener contacto por ID
export const getByIdThunk = createAsyncThunk(
    'contact/getById',
    async (id) => {
        await delay(delaytime);
        return data.find(contact => contact.id === id) || null;
    }
);

// Thunk para crear un nuevo contacto
export const createThunk = createAsyncThunk(
    'contact/create',
    async (newContact) => {
        await delay(delaytime);
        alert(`Contacto creado: ${JSON.stringify(newContact)}`);
        return newContact;
    }
);

// Thunk para editar un contacto
export const editThunk = createAsyncThunk(
    'contact/edit', 
    async ({ id, updatedContact }) => { 
        await delay(delaytime);
        const oldContact = data.find(contact => contact.id === id) || null; 
        alert(`Contacto modificado: ${JSON.stringify(oldContact)} -> ${JSON.stringify(updatedContact)}`);
        return updatedContact;
    }
);

// Thunk para eliminar un contacto
export const removeThunk = createAsyncThunk(
    'contact/remove',
    async (id) => {
        await delay(delaytime);
        const deletedContact = data.find(contact => contact.id === id) || null;
        alert(`Contacto eliminado: ${deletedContact}`);
        return id;
    }
);
