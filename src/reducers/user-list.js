import uuid from 'uuid/v4';
import { combineReducers } from 'redux';

const users = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        ...action.users.reduce(
          (acc, user) => {
            acc[uuid()] = user;

            return acc;
          },
          {}
        )
      };
    case 'CREATE_USER':
      return {
        ...state,
        [uuid()]: action.data
      };
    case 'UPDATE_USER':
      return {
        ...state,
        [action.id]: action.data
      };
    case 'DELETE_USER':
      // eslint-disable-next-line no-case-declarations
      const {
        [action.id]: deletedId,
        ...next
      } = state;

      return next;
    default:
      return state;
  }
};

const genderFilter = (state = 'none', action) => {
  switch (action.type) {
    case 'SET_GENDER_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const ageSort = (state = 'none', action) => {
  switch (action.type) {
    case 'SET_AGE_SORT_DIRECTION':
      return action.direction;
    default:
      return state;
  }
};

export default combineReducers({
  users,
  genderFilter,
  ageSort
});

export const getUserById = (state, id) => (
  state.users[id]
);

export const getGenderFilter = state => state.genderFilter;
export const getAgeSort = state => state.ageSort;

const filterByGender = (users, filter) => {
  if (filter === 'none') return users;

  return users.filter(
    user => user.data.gender === filter
  );
};

const sortByAge = (users, order) => {
  if (order === 'none') return users;

  let sortFunc;

  switch (order) {
    case 'ascending':
      sortFunc = (first, second) => (
        first.data.dob.age - second.data.dob.age
      );
      break;

    case 'descending':
      sortFunc = (first, second) => (
        second.data.dob.age - first.data.dob.age
      );
      break;

    default:
      return () => 0;
  }

  return users.slice().sort(sortFunc);
};

export const getVisibleUsersAsArray = (state) => {
  const genderFilter = getGenderFilter(state);
  const ageSort = getAgeSort(state);

  let users = Object.keys(state.users)
    .map(id => ({
      id,
      data: getUserById(state, id)
    }));

  users = filterByGender(users, genderFilter);
  users = sortByAge(users, ageSort);

  return users;
};
