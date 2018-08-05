import * as actions from './types';
import {
  getAllRepositories,
  getContributors,
  getRepository
} from '../api/github.api';
import store from '../store';

export const loadRepositories = () => async dispatch => {
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

export const loadContributors = repository => async dispatch => {
  try {
    dispatch(showLoading());
    dispatch({
      type: actions.GET_CONTRIBUTORS,
      payload: await getContributors(repository)
    });
    dispatch(hideLoading());
  } catch (error) {
    dispatch(showError(error));
  }
};

export const loadActiveRepository = repository => async dispatch => {
  if (typeof repository === 'object') {
    dispatch({
      type: actions.SET_ACTIVE_REPOSITORY,
      payload: repository
    });
  } else if (store.getState().repos.repository !== repository) {
    try {
      dispatch(showLoading());
      dispatch({
        type: actions.SET_ACTIVE_REPOSITORY,
        payload: await getRepository(repository)
      });
      dispatch(hideLoading());
    } catch (error) {
      dispatch(showError(error));
    }
  }
};

export const showLoading = () => ({ type: actions.SHOW_LOADING });

export const hideLoading = () => ({ type: actions.HIDE_LOADING });

export const showError = error => ({
  type: actions.SHOW_ERROR,
  payload: error // error.response.data.message
});
