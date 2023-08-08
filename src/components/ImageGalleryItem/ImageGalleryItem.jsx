import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ imageInfo, showLargeImage }) {
  const { webformatURL, tags: alt, largeImageURL } = imageInfo;

  return (
    <li
      className={css.galleryItem}
      onClick={() => {
        showLargeImage(largeImageURL, alt);
      }}
    >
      <img className={css.galleryItemImage} src={webformatURL} alt={alt} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  imageInfo: PropTypes.object.isRequired,
  showLargeImage: PropTypes.func.isRequired,
};
