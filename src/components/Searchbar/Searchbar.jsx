import React, { useState } from 'react';
import Notiflix from 'notiflix';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      setSearchQuery('');
      return Notiflix.Notify.info('Input your search query');
    }

    onSubmit(searchQuery);
    setSearchQuery('');
    };
     return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          name="searchQuery"
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />

        <button type="submit" className={styles.button}>
          
        </button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
