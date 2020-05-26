import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { AiOutlineDelete } from 'react-icons/ai';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

import { useMergedState } from '../../helper/useMergedState';

import styles from './AddVehicle.module.css';
import { AppInput, AppButton, PageHeader, Loading, Glitch } from '../../components';
import { getVehicleTypes } from '../../api/vehicles';
import { addVehicle } from '../../api/admin';

const AddVehicle = (props) => {
  const [state, setState] = useMergedState({
    thumbnail: null,
    thumbnailError: null,
    thumbnailPreview: null,

    images: [],
    imagesError: null,

    loading: false,
    error: null,
    success: false,

    typesLoading: true,
    typesError: null,
    types: [],
  });

  const {
    thumbnail,
    thumbnailError,
    thumbnailPreview,

    images,
    imagesError,

    loading,
    error,

    typesLoading,
    typesError,
    types,
  } = state;

  const { token } = props;

  useEffect(
    () => {
      loadVehicleTypesFromApi();
    }, //eslint-disable-next-line
    []
  );

  useEffect(
    () => () => {
      URL.revokeObjectURL(thumbnailPreview);
    },
    [thumbnailPreview]
  );

  useEffect(
    () => () => {
      images.forEach(({ preview }) => URL.revokeObjectURL(preview));
    },
    [images]
  );

  const loadVehicleTypesFromApi = async () => {
    try {
      if (!typesLoading) {
        setState({ typesLoading: true, typesError: null });
      }
      const response = await getVehicleTypes();
      setState({ typesLoading: false, types: [...response] });
    } catch (err) {
      setState({ typesLoading: false, typesError: err.message });
    }
  };

  const handleOnSubmit = async ({ type: { value }, name }) => {
    if (!thumbnail) {
      return setState({ thumbnailError: 'Please select a default image.' });
    }
    if (images.length < 1) {
      return setState({ imagesError: 'Please select at least 3 images.' });
    }
    try {
      setState({ loading: true, error: null });

      const vehicleData = {
        name,
        type: value,
        defaultImage: state.thumbnail,
        images: [...images.map((image) => image.file)],
      };
      await addVehicle(vehicleData, token);
      props.history.push('/vehicles');
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  };

  const handleOnRemove = () => {
    setState({ thumbnail: null, thumbnailPreview: null });
  };

  const onThumbnailDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setState({
        thumbnail: acceptedFiles[0],
        thumbnailError: null,
        thumbnailPreview: URL.createObjectURL(acceptedFiles[0]),
      });
    }
  };

  const onImagesDrop = (acceptedFiles) => {
    const withPrev = acceptedFiles.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    });
    setState({
      images: [...images, ...withPrev],
      imagesError: null,
    });
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setState({ images: [...updated] });
  };

  const renderImageList = () => {
    const itemsToRender = images.map((image, index) => {
      return (
        <div className={styles.image__div} key={image.preview}>
          <img src={image.preview} alt="product" className={styles.list__image} />
          <button type="button" className={styles.delete__btn} onClick={() => removeImage(index)}>
            <AiOutlineDelete color="#FFFFFF" size="30px" />
          </button>
        </div>
      );
    });
    return <div className={styles.images__div}>{itemsToRender}</div>;
  };

  const { getRootProps: getImagesRootProps, getInputProps: getImagesInputProps } = useDropzone({
    multiple: true,
    accept: 'image/jpeg',
    onDrop: onImagesDrop,
    disabled: loading,
  });

  const { getRootProps: getThumbRootProps, getInputProps: getThumbInputProps } = useDropzone({
    multiple: false,
    accept: 'image/jpeg',
    onDrop: onThumbnailDrop,
    disabled: loading,
  });

  const renderLoading = () => {
    return <Loading text="Loading Vehicle Types" />;
  };

  const renderGlitch = () => {
    return <Glitch text={typesError} onRetry={loadVehicleTypesFromApi} />;
  };

  const getVehicleTypesOptions = () => {
    return types.map(({ id, type, numberOfSeats, pricePerDay }) => ({
      value: id,
      label: `${type} - $${pricePerDay}/day - ${numberOfSeats} seats`,
    }));
  };

  const renderForm = () => {
    return (
      <div className={styles.form__div}>
        <Formik
          initialValues={{
            type: null,
            name: '',
          }}
          onSubmit={handleOnSubmit}
          validationSchema={Yup.object().shape({
            type: Yup.object().nullable().required('Please select a vehicle type'),
            name: Yup.string().required('Please enter a name'),
          })}
        >
          {({ setFieldValue, setFieldTouched, values: { type } }) => {
            return (
              <Form className={styles.tag__form}>
                <PageHeader text="Add Vehicle" />
                <Select
                  value={type}
                  onChange={(value) => {
                    setFieldValue('type', value);
                  }}
                  isClearable
                  options={getVehicleTypesOptions()}
                  onBlur={() => {
                    setFieldTouched('type', true);
                  }}
                />
                <ErrorMessage name="type">
                  {(message) => <label className={styles.form__error}>{message}</label>}
                </ErrorMessage>
                <AppInput
                  type="text"
                  name="name"
                  placeholder="Vehicle name"
                  loading={loading}
                  containerStyle={{ marginTop: '5px' }}
                />
                {thumbnail ? (
                  <div className={styles.thumbnail__div}>
                    <img src={thumbnailPreview} className={styles.image} alt="Selected" />
                    <button type="button" className={styles.delete__btn} onClick={handleOnRemove}>
                      <AiOutlineDelete color="#FFFFFF" size="50px" />
                    </button>
                  </div>
                ) : (
                  <div {...getThumbRootProps({ className: styles.dropzone })}>
                    <input {...getThumbInputProps()} />
                    <p className={styles.dropzone__text}>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                )}
                {thumbnailError && <label className={styles.form__error}>{thumbnailError}</label>}
                <div {...getImagesRootProps({ className: styles.dropzone })}>
                  <input {...getImagesInputProps()} />
                  <p className={styles.dropzone__text}>Drag 'n' drop some files here, or click to select files</p>
                </div>
                {imagesError && <label className={styles.form__error}>{imagesError}</label>}
                {images.length > 0 && renderImageList()}
                <AppButton type="submit" text="Add Tag" loading={loading} containerStyle={{ marginTop: '10px' }} />
                {error && <label className={styles.main__error}>{error}</label>}
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  };

  return (
    <div className={styles.root__div}>
      {typesLoading ? renderLoading() : typesError ? renderGlitch() : renderForm()}
    </div>
  );
};

const mapStateToProps = ({
  auth: {
    auth: { authToken: token },
  },
}) => {
  return {
    token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddVehicle));
