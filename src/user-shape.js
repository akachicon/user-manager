import PropTypes from 'prop-types';

export default {
  name: PropTypes.shape({
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired
  }).isRequired,
  gender: PropTypes.string.isRequired,
  dob: PropTypes.shape({
    age: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired
  }).isRequired
};
