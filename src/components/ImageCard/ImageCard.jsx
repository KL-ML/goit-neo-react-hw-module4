export default function ImageCard({
  photo,
  openModal,
}) {
  return (
    <>
      <div
        onClick={() => openModal(photo)}
      >
        <img
          src={photo.urls.small}
          alt={photo.alt_description}
          width="360"
          height="200"
        />
        <p>{photo.description}</p>
        <p>{photo.created_at}</p>
        <p>{photo.likes}</p>
      </div>
    </>
  );
}
