import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import EditUser from './edit-user';
import dummyUser from '../dummy-user';

const mapStateToProps = () => ({
  user: dummyUser
});

const mapDispatchToProps = {
  editUser: createUser
};

const CreateUser = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser));

export default CreateUser;
