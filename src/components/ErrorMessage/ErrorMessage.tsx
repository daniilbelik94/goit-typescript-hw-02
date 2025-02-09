import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <div className={css.boxErrorMessage}>
      <p className={css.descriptionErrorMessage}>
        Oops, some error occured. &quot;{errorMessage}&quot;
        <br />
        <span className={css.message}>Please try again later.🤷‍♀️</span>
      </p>
    </div>
  );
};

export default ErrorMessage;
