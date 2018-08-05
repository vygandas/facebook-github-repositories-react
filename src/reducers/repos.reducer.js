import { SHOW_ERROR } from '../actions/types';

export const initialState = {
  isLoading: true,
  repositories: null,
  errorMessage: null
};

export const repos = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return { ...state, ...{ errorMessage: action.payload } };
    default:
      return state;
  }
};
