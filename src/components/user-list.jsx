import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userShape from '../user-shape';
import {
  getVisibleUsersAsArray,
  getGenderFilter,
  getAgeSort,
  getIsFetching,
  getFetchError
} from '../reducers';
import {
  fetchUsers,
  setGenderFilter,
  setAgeSortDirection
} from '../actions';
import UserEntryContainer from './user-entry-container';
import UserEntry from './user-entry';

const UserList = (props) => {
  const {
    users,
    isFetching,
    genderFilter,
    ageSort,
    setGenderFilter,
    setAgeSortDirection,
    fetchUsers,
    fetchError
  } = props;

  const onGenderChange = (e) => {
    setGenderFilter(e.target.value);
  };
  const onAgeSortOrderChange = (e) => {
    setAgeSortDirection(e.target.value);
  };

  let isFetchingElement;
  let fetchErrorElement;

  if (isFetching) {
    isFetchingElement = (
      <p className="user-list__fetch-message">
        Fetching data...
      </p>
    );
  }
  if (fetchError) {
    fetchErrorElement = (
      <p className="user-list__fetch-error">
        {fetchError}
        <span>
          Press &#34;FETCH MORE USER&#34; to retry
        </span>
      </p>
    );
  }

  return (
    <div className="user-list">
      <div className="user-list__selectors">
        <div className="user-list__selector-group">
          <span className="user-list__selector-label">
            gender:
          </span>
          <select
            name="gender"
            className="user-list__selector"
            onChange={onGenderChange}
            value={genderFilter}
          >
            <option
              className="user-list__selector-option"
              value="none"
            >
              none
            </option>
            <option
              className="user-list__selector-option"
              value="male"
            >
              male
            </option>
            <option
              className="user-list__selector-option"
              value="female"
            >
              female
            </option>
          </select>
        </div>

        <div className="user-list__selector-group">
          <span className="user-list__selector-label">
            sort by age:
          </span>
          <select
            name="age"
            className="user-list__selector"
            onChange={onAgeSortOrderChange}
            value={ageSort}
          >
            <option
              value="none"
              className="user-list__selector-option"
            >
              none
            </option>
            <option
              value="ascending"
              className="user-list__selector-option"
            >
              ascending
            </option>
            <option
              value="descending"
              className="user-list__selector-option"
            >
              descending
            </option>
          </select>
        </div>
      </div>

      <ul className="user-list__items">
        <UserEntry
          name={{
            first: 'NAME',
            last: ''
          }}
          gender="GENDER"
          age="AGE"
          link={{
            to: '/user/new',
            text: 'create user',
          }}
        />
        {
          users.map(user => (
            <li key={user.id}>
              <UserEntryContainer user={user} />
            </li>
          ))
        }
      </ul>

      {isFetchingElement}
      {fetchErrorElement}

      <button
        type="button"
        className="user-list__fetch-button"
        onClick={fetchUsers}
      >
        fetch more users
      </button>
    </div>
  );
};

UserList.defaultProps = {
  fetchError: null
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      data: PropTypes.shape(userShape).isRequired
    }).isRequired
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
  genderFilter: PropTypes.string.isRequired,
  ageSort: PropTypes.string.isRequired,
  setGenderFilter: PropTypes.func.isRequired,
  setAgeSortDirection: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchError: PropTypes.string
};

const mapStateToProps = state => ({
  users: getVisibleUsersAsArray(state),
  genderFilter: getGenderFilter(state),
  ageSort: getAgeSort(state),
  isFetching: getIsFetching(state),
  fetchError: getFetchError(state),
});

const mapDispatchToProps = {
  fetchUsers,
  setGenderFilter,
  setAgeSortDirection
};

const connectedUserList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList));

export default connectedUserList;
