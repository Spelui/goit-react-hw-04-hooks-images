import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import getImg from '../../services/api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const loaderStyle = {
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

const App = () => {
  const [page, setPage] = useState(1);
  const [imgsArray, setImgsArray] = useState([]);
  const [searchImg, setSearchImg] = useState('');
  const [loader, setLoader] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [altImage, setAltImage] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSearchImg = async () => {
    setLoader(true);
    try {
      const imgs = await getImg(searchImg, page);

      if (!imgs.totalHits) {
        return toast.error('Please write valid value');
      }

      setImgsArray(prevImgsArray => [...prevImgsArray, ...imgs.hits]);

      if (imgsArray.length && page === 1) {
        toast.success(`We found ${imgs.totalHits} images`);
      }

      return imgs.hits;
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getSearchImg();
  }, [searchImg, page]);

  const fetchNextPageImg = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onSearchSubmit = searchImg => {
    setSearchImg(searchImg);
    setImgsArray([]);
    setPage(1);
  };

  const onCloseModal = () => {
    setLargeImg('');
    setAltImage('');
  };

  const onClickImage = e => {
    if (e.currentTarget === e.target) return;
    setLargeImg(e.target.dataset.large);
    setAltImage(e.target.alt);
  };

  return (
    <>
      <SearchBar onSubmit={onSearchSubmit} />
      <main>
        {loader && (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
            style={{ ...loaderStyle }}
            timeout={1000}
          />
        )}

        <ImageGallery>
          {imgsArray.map(img => (
            <ImageGalleryItem
              key={nanoid()}
              image={img}
              onClick={onClickImage}
            />
          ))}
        </ImageGallery>

        {imgsArray.length > 11 && <Button onClickBtn={fetchNextPageImg} />}

        <ToastContainer />
      </main>

      {largeImg && (
        <Modal onClose={onCloseModal} largeImg={largeImg} alt={altImage} />
      )}
    </>
  );
};

export default App;
