import PropTypes from 'prop-types';

export default function Logo({ logoImgPath }) {
  return (
    <>
      <a href="./index.html" aria-label="Site logo">
        <img src={logoImgPath} alt="GoIt logo" width="100" height="30" />
      </a>
    </>
  );
}

Logo.PropTypes = {
  logoImgPath: PropTypes.string.isRequired,
};
