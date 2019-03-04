const axios = require('axios');

export const finishInitialization = () => ({
  type: 'FINISH_INITIALIZATION'
});

export const fetchUsers = () => (dispatch) => {
  dispatch({
    type: 'FETCH_USERS'
  });

  return axios.get('https://randomuser.me/api/?results=3').then(
    (response) => {
      dispatch({
        type: 'FETCH_USERS_SUCCESS',
        users: response.data.results
      });
    },
    (error) => {
      dispatch({
        type: 'FETCH_USERS_FAILURE',
        error
      });
    }
  );
};

export const createUser = data => ({
  type: 'CREATE_USER',
  data
});

export const updateUser = (id, data) => ({
  type: 'UPDATE_USER',
  id,
  data
});

export const deleteUser = id => ({
  type: 'DELETE_USER',
  id
});

export const setAgeSortDirection = direction => ({
  type: 'SET_AGE_SORT_DIRECTION',
  direction
});

export const setGenderFilter = filter => ({
  type: 'SET_GENDER_FILTER',
  filter
});
