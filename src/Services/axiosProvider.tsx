import axios from 'axios';
import { API_URL, INews } from '../api';

export const AxiosProvider = ({ children }: any) => {

  
  axios.defaults.baseURL = API_URL;

  axios.interceptors.response.use(
    (response) => {
      if (response.data.hits) {
        const { hits: newsList } = response.data;
         response.data.hits = newsList.filter((news: Partial<INews>) =>
          news.author && news.story_title && news.story_url && news.created_at
        );

        return response;
      }

      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return children;
};