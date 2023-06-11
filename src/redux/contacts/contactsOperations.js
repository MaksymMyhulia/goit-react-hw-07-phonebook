import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { toastifyOptions } from 'utils/toastifyOptions';

axios.defaults.baseURL = 'https://647c5422c0bae2880ad09404.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get('/contacts');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);


// Функція, що перевіряє дублювання
const isDublicate = (contacts, { name, phone }) => {
  const normalizedName = name.toLowerCase().trim();
  const normalizedNumber = phone.trim();

  const dublicate = contacts.some(
    contact =>
      contact.name.toLowerCase().trim() === normalizedName ||
      contact.phone.trim() === normalizedNumber
  );
  return dublicate;
};

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contacts, thunkApi) => {
    try {
      const { data } = await axios.post('/contacts', contacts);
      toast.success('Add contact', {
        position: 'bottom-right',
      });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (data, { getState }) => {
      const {
        contacts: { items },
      } = getState();

      if (isDublicate(items, data)) {
        toast.error(`This contact is already in contacts`, toastifyOptions);
        return false; // якщо false  - запит преривається і не відбувається, в іншому випадку - запит продовжиться
      }
    },
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkApi) => {
    try {
      const { data } = await axios.delete(`/contacts/${id}`);
      toast.success('Contact delete', {
        position: 'bottom-right',
      });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

