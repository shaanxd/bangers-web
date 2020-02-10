import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import styles from './PasswordInput.module.css';

const PasswordInput = props => {
  const { name, placeholder, loading } = props;

  const [visible, setVisible] = useState(false);

  const handlePasswordVisible = () => {
    setVisible(wasVisible => !wasVisible);
  };

  return (
    <div className={styles.form__group}>
      <div className={styles.input__div}>
        <Field
          name={name}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          className={styles.form__input}
          disabled={loading}
        />
        <button
          onClick={handlePasswordVisible}
          className={styles.form__button_hide}
          type="button"
        >
          {visible ? (
            <FiEyeOff color="#888888" size="20px" />
          ) : (
            <FiEye color="#888888" size="20px" />
          )}
        </button>
      </div>
      <ErrorMessage name={name}>
        {message => <label className={styles.form__error}>{message}</label>}
      </ErrorMessage>
    </div>
  );
};

export default PasswordInput;
