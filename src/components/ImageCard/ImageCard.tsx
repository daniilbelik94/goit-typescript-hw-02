import css from './ImageCard.module.css';

interface ImageCardProps {
  imgSmall: string;
  title: string;
}

const ImageCard = ({ imgSmall, title }: ImageCardProps) => {
  return (
    <div className={css.containerImg}>
      <img className={css.imgSmall} src={imgSmall} alt={title} />
    </div>
  );
};

export default ImageCard;
