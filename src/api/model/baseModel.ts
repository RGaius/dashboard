export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

export interface BasicPageListResult<T> {
  records: T[];
  pages: number;
  total: number;
  current: number;
  size: number;
}
