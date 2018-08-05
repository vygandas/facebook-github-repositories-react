import * as actions from './types';
import {
  getAllRepositories,
  getContributors,
  getRepository
} from '../api/github.api';
import store from '../store';

/**
 * Get repositories from api and save into a store.
 */
export const loadRepositories = () => async dispatch => {
  try {
    dispatch(showLoading());
    dispatch({
      type: actions.GET_REPOSITORIES,
      payload: await getAllRepositories()
    });
    dispatch(hideLoading());
  } catch (error) {
    dispatch(showError('Could not retreive repositories list.'));
  }
};

/**
 * Get a list of contributors for particular repository.
 * @param {*} repository repository object
 */
export const loadContributors = repository => async dispatch => {
  try {
    dispatch(showLoading());
    dispatch({
      type: actions.GET_CONTRIBUTORS,
      payload: await getContributors(repository)
    });
    dispatch(hideLoading());
  } catch (error) {
    dispatch(showError('Could not retreive contributors list.'));
  }
};

/**
 * Get active repository object by its name or object.
 * If name is given - load data from api.
 * If object given - only set it to state and don't call api.
 * @param {{*}|string} repository repository object or name
 */
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
      dispatch(
        showError('Could not retreive active repository. Please try again.')
      );
    }
  }
};

export const showLoading = () => ({ type: actions.SHOW_LOADING });

export const hideLoading = () => ({ type: actions.HIDE_LOADING });

export const showError = message => ({
  type: actions.SHOW_ERROR,
  payload: message
});
