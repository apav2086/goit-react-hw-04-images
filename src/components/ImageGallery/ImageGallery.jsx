import React, { useEffect, useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import fetchImages from '../../services/image-api';
import Notiflix from 'notiflix';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ searchQuery, onModalOpen }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(1);
    const [status, setStatus] = useState('idle');
    
      const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    };
    
    useEffect(() => {
        const fetchImagesData = async () => {
            setStatus('pending');

            try {
                const response = await fetchImages(searchQuery, page === 1);
                const { totalHits, hits } = response;

                if (totalHits > 0) {
                    Notiflix.Notify.success(`Hooray! We found ${totalHits} images of ${searchQuery}.`
                    );
                    setTotalHits(totalHits);
                    setImages(prevImages => [...prevImages, ...hits]);
                    setStatus('resolved');
                } else {
                    setStatus('rejected');
                    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'
                    );
                }
            } catch (error) {
                console.error('Error fetching images:', error);
                setStatus('rejected');
                Notiflix.Notify.failure('Sorry, there was an error fetching the images. Please try again.');
            }
        };
         if (searchQuery !== '') {
      setTotalHits(1);
      setPage(1);
      setImages([]);
      fetchImagesData();
    }
        }, [searchQuery, page]);
    
    if (status === 'pending') {
    return (
      <div>
        <ul className={styles.gallery}>
          <ImageGalleryItem data={images} openModal={onModalOpen} />
        </ul>
        <Loader />
      </div>
    );
    }
    
    if (images.length === totalHits || images.length > totalHits) {
    return (
      <div>
        <ul className={styles.gallery}>
          <ImageGalleryItem data={images} openModal={onModalOpen} />
        </ul>
      </div>
    );
    }
      if (status === 'resolved') {
    return (
      <div>
        <ul className={styles.gallery}>
          <ImageGalleryItem data={images} openModal={onModalOpen} />
        </ul>
        <Button text={'Load more'} buttonClick={handleLoadMore} />
      </div>
    );
  }

  return null;
};
ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onModalOpen: PropTypes.func.isRequired,
};

export default ImageGallery;