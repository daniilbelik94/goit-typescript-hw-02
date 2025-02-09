import { useState } from 'react';
import axios from 'axios';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

import { Image, ModalImage } from './types';

import css from './App.module.css';

interface FetchDataImage {
  data: { results: Image[]; total_pages: number };
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [pages, setPages] = useState<number>(2);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<ModalImage>({
    alt_description: '',
    likes: 0,
    links: '',
    image: '',
    userName: '',
    instagram: '',
    location: '',
  });
  const [yScroll, setYScroll] = useState<number>(0);

  function openModal(): void {
    setIsOpen(true);
    setYScroll(window.scrollY);
    document.body.style.position = 'fixed';
  }

  function closeModal(): void {
    setIsOpen(false);
    document.body.style.position = '';
    window.scrollBy({
      top: yScroll,
      left: 0,
      behavior: 'instant',
    });
  }

  const onModalImage = (
    alt_description: string,
    likes: number,
    links: string,
    image: string,
    userName: string,
    instagram: string,
    location: string
  ): void => {
    setModalImage({
      ...modalImage,
      alt_description: alt_description,
      likes: likes,
      links: links,
      image: image,
      userName: userName,
      instagram: instagram,
      location: location,
    });
  };

  const fetchImageSubmit = async (searchTerm: string): Promise<void> => {
    try {
      setPages(2);
      setSearchValue(searchTerm);
      setImages([]);
      setLoader(true);
      setErrorMessage(null);
      axios.defaults.baseURL = 'https://api.unsplash.com';
      const option = {
        params: {
          client_id: 'H43MHeoib1rOg9NARWDOA76ysBGu7NV9woWDjNVVvCo',
          query: `${searchTerm}`,
          page: 1,
          per_page: 20,
          orientation: 'landscape',
        },
      };
      const response: FetchDataImage = await axios.get(
        '/search/photos',
        option
      );
      setImages(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoader(false);
    }
  };

  const fetchImageClick = async (): Promise<void> => {
    try {
      setErrorMessage(null);
      setLoader(true);
      axios.defaults.baseURL = 'https://api.unsplash.com';
      const option = {
        params: {
          client_id: 'H43MHeoib1rOg9NARWDOA76ysBGu7NV9woWDjNVVvCo',
          query: `${searchValue}`,
          page: pages,
          per_page: 20,
          orientation: 'landscape',
        },
      };
      const response: FetchDataImage = await axios.get(
        '/search/photos',
        option
      );
      setImages([...images, ...response.data.results]);
      setPages(pages + 1);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className={css.container}>
      <SearchBar onSearch={fetchImageSubmit} searchValue={searchValue} />
      {images !== null && (
        <ImageGallery
          images={images}
          onClick={onModalImage}
          openModal={openModal}
        />
      )}
      {loader && <Loader />}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {pages <= totalPages && images !== null && errorMessage === null && (
        <LoadMoreBtn fetchImage={fetchImageClick} />
      )}
      <ImageModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalImage={modalImage}
      />
    </div>
  );
}

export default App;
