import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserById } from '../reducers';
import { updateUser } from '../actions';
import EditUser from './edit-user';

const deriveIdFromPath = path => (
  path.slice(path.lastIndexOf('/') + 1)
);

const mapStateToProps = (state, { location }) => {
  const id = deriveIdFromPath(location.pathname);
  const user = getUserById(state, id);

  if (user !== null) {
    return { user };
  }

  return {
    error: 'No user found'
  };
};

const mapDispatchToProps = (dispatch, { location }) => {
  const id = deriveIdFromPath(location.pathname);

  return {
    editUser: (data) => {
      dispatch(updateUser(id, data));
    }
  };
};

const UpdateUser = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser));

export default UpdateUser;
