import PropTypes from 'prop-types';
import './ImageGalleryItem.scss';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <>
      <li className="ImageGalleryItem" key={image.id} onClick={onClick}>
        <img
          className="ImageGalleryItem-image"
          src={image.webformatURL}
          alt={image.tags}
          data-large={image.largeImageURL}
        />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
