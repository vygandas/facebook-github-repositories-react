import axios from 'axios';
import * as actions from './types';
import { getRepositoriesApiUrl } from '../api/github.api';
import { parseHeadersForPagesCount } from '../helpers/headers';

export const getRepositories = () => async dispatch => {
  try {
    dispatch(showLoading());
    let response = await axios.get(getRepositoriesApiUrl());
    let repositories = [];
    const pagesCount = parseHeadersForPagesCount(await response.headers);
    repositories = await response.data;
    console.log('pagesCount', pagesCount);
    if (pagesCount > 1) {
      for (let i = 2; i <= pagesCount; i++) {
        response = await axios.get(getRepositoriesApiUrl(i));
        repositories = repositories.concat(await response.data);
      }
    }
    dispatch({
      type: actions.GET_REPOSITORIES,
      payload: {
        repositories
      }
    });
    dispatch(hideLoading());
  } catch (error) {
    console.log('error', error);
    dispatch({
      type: actions.SHOW_ERROR,
      payload: error // error.response.data.message
    });
  }
};

export function showLoading() {
  return {
    type: actions.SHOW_LOADING
  };
}

export function hideLoading() {
  return {
    type: actions.HIDE_LOADING
  };
}
