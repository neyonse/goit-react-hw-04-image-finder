import css from './App.module.css';
import { useState } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import Modal from 'components/Modal';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  const handleSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const showLargeImage = (largeImageURL, alt) => {
    setLargeImageURL(largeImageURL);
    setAlt(alt);
    toggleModal();
  };

  return (
    <div className={css.app}>
      <Searchbar handleSubmit={handleSubmit} />
      <ImageGallery
        newSearchQuery={searchQuery}
        showLargeImage={showLargeImage}
      />
      <ToastContainer />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={alt} />
        </Modal>
      )}
    </div>
  );
}
