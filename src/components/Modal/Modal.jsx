import PropTypes from 'prop-types';
import './Modal.scss';
const { useEffect } = require('react');

const Modal = ({ onClose, largeImg, alt }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pressEsc = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', pressEsc);
    return () => {
      window.removeEventListener('keydown', pressEsc);
    };
  }, [pressEsc]);

  return (
    <div className="overlay" onClick={onBackDropClick}>
      <div className="modal">
        <img src={largeImg} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string,
  alt: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
