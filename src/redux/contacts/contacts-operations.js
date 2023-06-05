import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

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


export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id, thunkApi) => {
  try {
    const { data } = await axios.delete(`/contacts/${id}`);
    return data;
} catch (error) {
    return thunkApi.rejectWithValue(error.message);
}
});

export const addContact = createAsyncThunk('contacts/addContact', async (contacts, thunkApi) => {
  try {
      const { data } = await axios.post('/contacts', contacts);
      return data;
  } catch (error) {
      return thunkApi.rejectWithValue(error.message);
  }
});


