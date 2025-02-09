import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  fetchImage: () => Promise<void>;
}

const LoadMoreBtn = ({ fetchImage }: LoadMoreBtnProps) => {
  const handleClick = () => {
    fetchImage();
  };

  return (
    <div className={css.btnLoadMoreBox}>
      <button className={css.btnLoadMore} onClick={handleClick} type="submit">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
