import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getIsInitializing } from '../reducers';
import { fetchUsers, finishInitialization } from '../actions';
import UserList from './user-list';
import CreateUser from './create-user';
import UpdateUser from './update-user';

class App extends Component {
  componentDidMount() {
    const {
      fetchUsers,
      finishInitialization,
      isInitializing
    } = this.props;

    if (isInitializing) {
      finishInitialization();
      fetchUsers();
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={UserList} />
        <Route path="/user/new" component={CreateUser} />
        <Route path="/user/:id" component={UpdateUser} />
      </Switch>
    );
  }
}

App.defaultProps = {
  finishInitialization: () => {}
};

App.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  finishInitialization: PropTypes.func,
  isInitializing: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isInitializing: getIsInitializing(state)
});

const mapDispatchToProps = {
  finishInitialization,
  fetchUsers
};

const connectedApp = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));

export default hot(connectedApp);
