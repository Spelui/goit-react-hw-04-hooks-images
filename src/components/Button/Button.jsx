import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ onClickBtn }) => {
  return (
    <div className="coverBtn">
      <button onClick={() => onClickBtn()} className="btn" type="button">
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClickBtn: PropTypes.func,
};

export default Button;
