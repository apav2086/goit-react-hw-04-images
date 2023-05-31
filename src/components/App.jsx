import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Notiflix from 'notiflix';


 export const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');

  const handleSubmit = query => {
    console.log(query);
    if (query === '') {
      return Notiflix.Notify.info("Input a search query.");
    }
    if (query === searchQuery) {
      return Notiflix.Notify.info("Input new search query.");
    }
    setSearchQuery(query);
  };
  const toggleModal = data => {
    setShowModal(!showModal);
    if (!showModal) {
      const { largeImageURL, tags } = data;
      setSrc(largeImageURL);
      setAlt(tags);
    }
  };
  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery searchQuery={searchQuery} onModalOpen={toggleModal} />

      {showModal && (
        <Modal onModalClose={toggleModal}>
          <img src={src} alt={alt} />
        </Modal>
      )}
    </div>
  );
};

