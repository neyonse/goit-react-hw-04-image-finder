import css from './Searchbar.module.css';
import { useState } from 'react';
import { TbPhotoSearch } from 'react-icons/tb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export default function Searchbar({ handleSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      toast.warn('Search bar is empty! Please enter a search query.');
      setInputValue('');
      return;
    }

    setInputValue(inputValue.trim());
    handleSubmit(inputValue);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <button className={css.searchFormBtn} type="submit">
          <TbPhotoSearch className={css.searchFormBtnIcon} />
        </button>
        <input
          className={css.searchFormInput}
          value={inputValue}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
