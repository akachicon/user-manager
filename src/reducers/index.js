import { combineReducers } from 'redux';
import userList, * as fromUserList from './user-list';

const isInitializing = (state = true, action) => {
  switch (action.type) {
    case 'FINISH_INITIALIZATION':
      return false;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return true;
    case 'FETCH_USERS_SUCCESS':
    case 'FETCH_USERS_FAILURE':
      return false;
    default:
      return state;
  }
};

const fetchError = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_USERS':
    case 'FETCH_USERS_SUCCESS':
      return null;
    case 'FETCH_USERS_FAILURE':
      return action.error;
    default:
      return state;
  }
};

export default combineReducers({
  isInitializing,
  isFetching,
  fetchError,
  userList
});

export const getIsInitializing = state => (
  state.isInitializing
);

export const getIsFetching = state => (
  state.isFetching
);

export const getFetchError = state => (
  state.fetchError && state.fetchError.message
);

export const getVisibleUsersAsArray = state => (
  fromUserList.getVisibleUsersAsArray(state.userList)
);

export const getUserById = (state, id) => (
  fromUserList.getUserById(state.userList, id)
);

export const getGenderFilter = state => (
  fromUserList.getGenderFilter(state.userList)
);

export const getAgeSort = state => (
  fromUserList.getAgeSort(state.userList)
);
