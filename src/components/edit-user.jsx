import React, { Component } from 'react';
import PropTypes from 'prop-types';
import userShape from '../user-shape';

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const {
      user,
      editUser,
      history
    } = this.props;

    const {
      firstname,
      lastname,
      gender,
      age
    } = this.form.elements;

    editUser({
      ...user,
      name: {
        ...user.name,
        first: firstname.value,
        last: lastname.value
      },
      dob: {
        ...user.dob,
        age: age.value
      },
      gender: gender.value
    });

    history.push('/');
  }

  render() {
    const {
      error,
      user
    } = this.props;

    if (error) {
      return <p>{error}</p>;
    }

    return (
      <form
        className="edit-user"
        ref={(form) => {
          this.form = form;
        }}
      >
        <h1 className="edit-user__header">
          User Profile
        </h1>

        <label
          htmlFor="edit-user-firstname"
          className="edit-user__label"
        >
          First name:
          <input
            id="edit-user-firstname"
            className="edit-user__input"
            type="text"
            name="firstname"
            defaultValue={user.name.first}
          />
        </label>

        <label
          htmlFor="edit-user-lastname"
          className="edit-user__label"
        >
          Last name:
          <input
            id="edit-user-lastname"
            className="edit-user__input"
            type="text"
            name="lastname"
            defaultValue={user.name.last}
          />
        </label>

        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label
          htmlFor="edit-user-gender"
          className="edit-user__label"
        >
          Gender:
          <select
            id="edit-user-gender"
            className="edit-user__selector"
            name="gender"
            defaultValue={user.gender}
          >
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </label>

        <label
          htmlFor="edit-user-age"
          className="edit-user__label"
        >
          Age:
          <input
            id="edit-user-age"
            className="edit-user__input"
            type="number"
            name="age"
            defaultValue={user.dob.age}
          />
        </label>

        <button
          type="submit"
          className="edit-user__button"
          onClick={this.onSubmit}
        >
          save
        </button>
      </form>
    );
  }
}

EditUser.defaultProps = {
  error: null
};

EditUser.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  editUser: PropTypes.func.isRequired,
  error: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default EditUser;
