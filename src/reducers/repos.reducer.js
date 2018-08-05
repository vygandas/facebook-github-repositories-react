import * as actions from '../actions/types';

export const initialState = {
  isLoading: true,
  repositories: null,
  errorMessage: null
};

export const repos = (state = initialState, action) => {
  switch (action.type) {
    case actions.SHOW_ERROR:
      return { ...state, ...{ errorMessage: action.payload } };
    case actions.SHOW_LOADING:
      return { ...state, isLoading: true };
    case actions.HIDE_LOADING:
      return { ...state, isLoading: false };
    case actions.GET_REPOSITORIES:
      return {
        ...state,
        ...{
          repositories: action.payload,
          errorMessage: null
        }
      };
    default:
      return state;
  }
};
