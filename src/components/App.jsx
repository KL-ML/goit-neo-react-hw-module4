import Section from './Section/Section';
import Header from './Header/Header';
import logoImgPath from '../images/logo.svg';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Backdrop from './Backdrop/Backdrop';
import Sidebar from './Sidebar/Sidebar';
import menuItems from '../data/sidebarMenu.json';
import { useEffect, useState } from 'react';
import Description from './Description/Description';
import { fetchPhotosWithQuery } from '../api/unsplash-photos-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageModal from './ImageModal/ImageModal';
import Button from './Button/Button';

const homeWork = {
  number: '4',
  title: 'API. Hooks.',
};

const App = () => {
  const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModalOpen] = useState(false);
  const [selectedPhoto, setselectedPhoto] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!searchQuery) return;
    const fetching = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchPhotosWithQuery(searchQuery, page);
        console.log(data.results);
        setPhotos(prev =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
        setTotal(data.total_pages);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetching();
  }, [searchQuery, page]);

  const handleSearch = query => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  const openModal = photo => {
    setselectedPhoto(photo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setselectedPhoto(null);
  };

  //open-close mobile menu sidebar
  function updateMobileMenuStatus(mobileMenuStatus) {
    setMobileMenuStatus((mobileMenuStatus = !mobileMenuStatus));
  }

  return (
    <Section>
      <Header
        logoImgPath={logoImgPath}
        moduleNumber={homeWork.number}
        moduleTitle={homeWork.title}
        onUpdate={updateMobileMenuStatus}
        onSearch={handleSearch}
        isDisabled={loading}
      />
      <Main>
        <Description
          title="Photo Gallery"
          description="Please add your contacts in the phonebook by filling the form below."
        />
        <div>
          {error && <ErrorMessage />}
          {/* {searchQuery && !loading && photos.length > 0 ? ( */}
          {photos.lenght === 0 && !loading ? (
            <p>Enter your search query</p>
          ) : (
            <ImageGallery
              items={photos}
              // handleLoadMoreClick={handleLoadMoreClick}
              openModal={openModal}
              // total={total}
              // page={page}
            />
          )}
          {total > page && (
            <Button
              text="Load more ..."
              variant="filled"
              btnType="button"
              handleLoadMoreClick={handleLoadMoreClick}
            />
          )}
          {loading && <Loader loading={loading} />}
          <ImageModal
            modalOpen={modal}
            closeModal={closeModal}
            selectedPhoto={selectedPhoto}
          />
        </div>
      </Main>
      <Footer />
      <Backdrop mobileMenu={mobileMenuStatus}>
        <Sidebar
          menuItems={menuItems}
          variant="mobileMenu"
          mobileMenu={mobileMenuStatus}
          moduleNumber={homeWork.number}
          moduleTitle={homeWork.title}
          onUpdate={updateMobileMenuStatus}
        />
      </Backdrop>
    </Section>
  );
};

export default App;
