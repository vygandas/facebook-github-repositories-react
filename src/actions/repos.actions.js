import axios from 'axios';
import * as actions from './types';
import { getRepositoriesApiUrl } from '../api/github.api';
import { parseHeadersForPagesCount } from '../helpers/headers';

export const getRepositories = () => async dispatch => {
  try {
    dispatch(showLoading());
    const response = await axios.get(getRepositoriesApiUrl());
    dispatch({
      type: actions.GET_REPOSITORIES,
      payload: {
        repositories: await response.data,
        pages: parseHeadersForPagesCount(await response.headers)
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
