import ImageCard from '../ImageCard/ImageCard';
import Button from '../Button/Button';

export default function ImageGallery({ items, openModal }) {
  return (
    <>
      {items.length > 0 && (
        <>
          <ul>
            {items.map(photo => (
              <li key={photo.id}>
                <ImageCard photo={photo} openModal={openModal} />
              </li>
            ))}
          </ul>
          {/* {total > page &&
            <Button
              text="Load more ..."
              variant="filled"
              btnType="button"
              handleLoadMoreClick={handleLoadMoreClick}
            />
          } */}
        </>
      )}
    </>
  );
}
