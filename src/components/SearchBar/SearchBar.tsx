import { ErrorMessage, Field, Form, Formik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

import { searchSchema } from '../utils/schemas';

import css from './SearchBar.module.css';

const INITIAL_VALUES = {
  searchImage: '',
};

interface SearchBarProps {
  onSearch: (searchTerm: string) => Promise<void>;
  searchValue: string;
}

const SearchBar = ({ onSearch, searchValue }: SearchBarProps) => {
  const handleSubmit = (
    values: { searchImage: string },
    actions: { resetForm: () => void }
  ) => {
    toast.error('Field is required');
    onSearch(values.searchImage);
    actions.resetForm();
  };

  return (
    <header className={css.header}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={searchSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.formSearch}>
          <div className={css.formSearchBox}>
            <button className={css.btnSearch} type="submit">
              🔍
            </button>
            <Field
              className={css.inputSearch}
              type="text"
              name="searchImage"
              placeholder="Enter search term"
            />
          </div>
          <ErrorMessage
            className={css.inputError}
            name="searchImage"
            component="span"
          />
        </Form>
      </Formik>
      {searchValue === '' && <Toaster position="top-right" />}
    </header>
  );
};

export default SearchBar;
