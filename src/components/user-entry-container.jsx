import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userShape from '../user-shape';
import { deleteUser } from '../actions';
import UserEntry from './user-entry';

const UserEntryContainer = (props) => {
  const {
    user,
    deleteUser
  } = props;

  const {
    name,
    gender,
    dob
  } = user.data;

  return (
    <UserEntry
      name={name}
      gender={gender}
      age={dob.age}
      link={{
        to: `/user/${user.id}`,
        text: 'edit'
      }}
      button={{
        onClick: () => deleteUser(user.id),
        text: 'delete'
      }}
    />
  );
};

UserEntryContainer.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    data: PropTypes.shape(userShape).isRequired
  }).isRequired,
  deleteUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  deleteUser
};

const connectedUserEntryContainer = withRouter(connect(
  null,
  mapDispatchToProps
)(UserEntryContainer));

export default connectedUserEntryContainer;
