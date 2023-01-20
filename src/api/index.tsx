export const API_URL = 'https://hn.algolia.com/api/v1/search_by_date';

export interface INews {
  objectID: number;
  story_id: number;
  author: string;
  created_at: string;
  story_title: string;
  story_url: string;
}

export interface INewsPagination {
  hits: INews[];
  page: number;
  nbPages: number;
  hitsPerPage: number;
  query: string;
}

export interface NewsState {
  actualNews: INewsPagination;
  selectedNews: INews;
  favoriteNews: INews[];
  loading: boolean;
  msg: string;
}