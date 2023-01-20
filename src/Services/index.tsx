import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../api';

export const getHackerNews = createAsyncThunk(
  'hackerNews/getHackerNews',
  async (args: any, { rejectWithValue }) => {
    try {
      const {query, page} = args;
      const response: AxiosResponse = await axios.get(`${API_URL}?hitsPerPage=10${query ? '&query=' + query : ''}&page=${page ?? 0}`);

      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (e) {
      return rejectWithValue('Hacker News could not be loaded');
    }
  }
);