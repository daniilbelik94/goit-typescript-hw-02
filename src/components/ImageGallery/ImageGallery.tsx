import ImageCard from '../ImageCard/ImageCard';

import { Image } from '../../types';

import css from './ImageGallery.module.css';

type ImageGalleryProps = {
  images: Image[];
  onClick: (
    alt_description: string,
    likes: number,
    links: string,
    image: string,
    userName: string,
    instagram: string,
    location: string
  ) => void;
  openModal: () => void;
};

const ImageGallery = ({ images, onClick, openModal }: ImageGalleryProps) => {
  return (
    <ul className={css.listImages}>
      {images.map((image: Image) => {
        return (
          <li
            className={css.listItemImage}
            key={image.id}
            onClick={(): void => {
              onClick(
                image.alt_description,
                image.likes,
                image.links.download,
                image.urls.regular,
                image.user.name,
                image.user.instagram_username,
                image.user.location
              );
              openModal();
            }}
          >
            <ImageCard
              imgSmall={image.urls.small}
              title={image.alt_description}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
