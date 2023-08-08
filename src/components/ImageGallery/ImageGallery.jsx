import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import APIservices from 'utils';
import Loader from 'components/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    searchQuery: '',
    data: [],
    total: '',
    page: 1,
    status: 'idle',
    showBtn: false,
    showBtnLoader: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const newSearchQuery = this.props.searchQuery;
    const { searchQuery, data, page } = this.state;

    if (prevProps.searchQuery !== newSearchQuery) {
      this.setState({
        searchQuery: newSearchQuery,
        data: [],
        page: 1,
        status: 'idle',
      });

      this.setState({ status: 'pending' });
      this.fetchImages(newSearchQuery, 1);
      return;
    }

    if (prevState.page !== page && data.length !== 0) {
      this.setState({ showBtnLoader: true });
      this.fetchImages(searchQuery, page);
      return;
    }
  }

  async fetchImages(searchQuery, page) {
    try {
      const { hits, total } = await APIservices.fetchImages(searchQuery, page);

      this.setState(prevState => ({
        total,
        status: 'resolved',
        showBtnLoader: false,
        data: [...prevState.data, ...hits],
        showBtn: page < Math.ceil(total / 12) ? true : false,
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { searchQuery, data, total, status, showBtn, showBtnLoader } =
      this.state;

    if (status === 'idle') {
      return (
        <p className={css.galleryMessage}>
          Enter your query to find the images.
        </p>
      );
    }

    if (status === 'pending') {
      return <Loader message={'Loading images... Please, wait.'} />;
    }

    if (status === 'rejected') {
      return (
        <p className={css.galleryMessage} style={{ color: 'red' }}>
          Oops! Something went wrong. Please, try reload the page.
        </p>
      );
    }

    if (status === 'resolved') {
      return (
        <section className={css.gallerySection}>
          <p className={css.galleryMessage}>
            We found {total} images for "{searchQuery}"!
          </p>
          <ul className={css.gallery}>
            {data.map(el => (
              <ImageGalleryItem
                key={el.id}
                imageInfo={el}
                showLargeImage={this.props.showLargeImage}
              />
            ))}
          </ul>
          {showBtn && (
            <Button onClick={this.handleLoadMore} showLoader={showBtnLoader} />
          )}
        </section>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  showLargeImage: PropTypes.func.isRequired,
};
