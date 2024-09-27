import { createAsyncThunk } from "@reduxjs/toolkit";
// @ts-ignore
import data from '../../components/json/MOCK_DATA.json';

interface Contact {
    id: number;
    name: string;
    date: string;
    email: string;
    phone: string;
    value: number;
}

const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
const delaytime = 1500;

// Thunk para obtener todos los contactos
export const getAllThunk = createAsyncThunk(
    'contact/getAll',
    async (): Promise<Contact[]> => {
        await delay(delaytime);
        return data;
    }
);

// Thunk para obtener contacto por ID
export const getByIdThunk = createAsyncThunk(
    'contact/getById',
    async (id: number): Promise<Contact | null> => { 
        await delay(delaytime);
        return data.find((contact: Contact) => contact.id === id) || null;
    }
);

// Thunk para crear un nuevo contacto
export const createThunk = createAsyncThunk(
    'contact/create',
    async (newContact: Contact): Promise<Contact> => {
        await delay(delaytime);
        alert(`Contacto creado: ${JSON.stringify(newContact)}`);
        return newContact;
    }
);

// Thunk para editar un contacto
export const editThunk = createAsyncThunk(
    'contact/edit', 
    async ({ id, updatedContact }: { id: number, updatedContact: Contact }): Promise<Contact> => { 
        await delay(delaytime);
        const oldContact = data.find((contact: Contact) => contact.id === id) || null; 
        alert(`Contacto modificado: ${JSON.stringify(oldContact)} -> ${JSON.stringify(updatedContact)}`);
        return updatedContact;
    }
);

// Thunk para eliminar un contacto
export const removeThunk = createAsyncThunk(
    'contact/remove',
    async (id: number): Promise<number> => {
        await delay(delaytime);
        const deletedContact = data.find((contact: Contact) => contact.id === id) || null;
        alert(`Contacto eliminado: ${deletedContact}`);
        return id;
    }
);