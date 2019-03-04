import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserEntry = (props) => {
  const {
    name,
    gender,
    age,
    link,
    button
  } = props;

  let linkElement;
  let buttonElement;

  if (link) {
    linkElement = (
      <Link
        to={link.to}
        className="user-entry__link"
      >
        {link.text}
      </Link>
    );
  }
  if (button) {
    buttonElement = (
      <button
        type="button"
        className="user-entry__button"
        onClick={button.onClick}
      >
        {button.text}
      </button>
    );
  }

  return (
    <div className="user-entry">
      <span className="user-entry__name">
        {`${name.first} ${name.last}`}
      </span>
      <span className="user-entry__gender">
        {gender}
      </span>
      <span className="user-entry__age">
        {age}
      </span>
      <span className="user-entry__controls">
        {linkElement}
        {buttonElement}
      </span>
    </div>
  );
};

UserEntry.defaultProps = {
  link: null,
  button: null
};

UserEntry.propTypes = {
  name: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string
  }).isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  link: PropTypes.shape({
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }),
  button: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  }),
};

export default UserEntry;
