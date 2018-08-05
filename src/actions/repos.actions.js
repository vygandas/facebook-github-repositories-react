import * as actions from './types';
import { getAllRepositories, getContributors } from '../api/github.api';

export const getRepositories = () => async dispatch => {
  try {
    dispatch(showLoading());
    dispatch({
      type: actions.GET_REPOSITORIES,
      payload: await getAllRepositories()
    });
    dispatch(hideLoading());
  } catch (error) {
    dispatch(showError(error));
  }
};

export const showLoading = () => ({ type: actions.SHOW_LOADING });

export const hideLoading = () => ({ type: actions.HIDE_LOADING });

export const showError = error => ({
  type: actions.SHOW_ERROR,
  payload: error // error.response.data.message
});
