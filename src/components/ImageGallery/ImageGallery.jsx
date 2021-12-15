import PropTypes from 'prop-types';

import './ImageGallery.scss';

const ImageGallery = ({ children }) => {
  return <ul className="ImageGallery">{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.array,
};

export default ImageGallery;
