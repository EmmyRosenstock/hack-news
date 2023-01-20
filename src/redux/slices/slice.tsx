import { INewsPagination, INews, NewsState } from '../../api/';
import {createSlice} from '@reduxjs/toolkit';
import { getHackerNews } from '../../Services/index';

const initialState: NewsState = {
  actualNews: {} as INewsPagination,
  selectedNews: {} as INews,
  favoriteNews: [] as INews[],
  loading: false,
  msg: ''
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    getFavoriteNews: (state) => {
      state.favoriteNews = JSON.parse(localStorage.getItem('favoriteNews') || '[]');
    },
    addFavoriteNews(state, action) {
      state.favoriteNews.push(action.payload);
      localStorage.setItem('favoriteNews', JSON.stringify(state.favoriteNews));
    },
    removeFavoriteNews(state, action) {
      state.favoriteNews = state.favoriteNews.filter(news => news.objectID !== action.payload);
      localStorage.setItem('favoriteNews', JSON.stringify(state.favoriteNews));
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getHackerNews.pending, (state) => {
        state.loading = true;
        state.msg = '';
      })
      .addCase(getHackerNews.fulfilled, (state, {payload}) => {
        state.actualNews = payload ?? {} as INewsPagination;
        state.loading = false;
      })
      .addCase(getHackerNews.rejected, (state, {payload}) => {
        state.actualNews = {} as INewsPagination;
        state.loading = false;
        state.msg = payload as string ?? 'News Not found';
      });
  }
});

export const {getFavoriteNews, addFavoriteNews, removeFavoriteNews} = newsSlice.actions;
export default newsSlice.reducer;