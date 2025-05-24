import React from 'react';
import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

export default function ImageModal({ modalOpen, closeModal, selectedPhoto }) {
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className={css.modal}
      overlayClassName={css.overlay}
      contentLabel="Image Modal"
    >
      {selectedPhoto && (
        <div>
          <img
            src={selectedPhoto.urls.regular}
            alt={selectedPhoto.alt_description}
            className={css.image}
          />
          <div className={css.info}>
            <p>
              <strong>Description:</strong> {selectedPhoto.alt_description}
            </p>
            <p>
              <strong>Author:</strong>
              <a
                href={selectedPhoto.user.links.self}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedPhoto.user.username}
              </a>
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
