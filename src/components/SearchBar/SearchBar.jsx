import { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.scss';

const SearchBar = ({ onSubmit }) => {
  const [imgName, setImgName] = useState('');

  const imgToSearch = imgName => {
    setImgName(imgName);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    onSubmit(imgName);
  };

  return (
    <header className="searchbar">
      <form className="SearchForm" onSubmit={onFormSubmit}>
        <button type="submit" className="SearchForm-button">
          &#128269;
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={e => imgToSearch(e.target.value)}
          value={imgName}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propsTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;
