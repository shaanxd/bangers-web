import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { AiOutlineDelete } from 'react-icons/ai';
import DatePicker from 'react-datepicker';

import { getDateStringInUTC } from '../../helper/vehicleHelper';
import { useMergedState } from '../../helper/useMergedState';
import { addDocument, getUser, getDocuments } from '../../api/user';
import { documentTypes, documentTypesArray } from '../../constants/constants';
import { getImageUrl } from '../../helper/vehicleHelper';
import { AppButton, PageHeader, Loading, Glitch } from '../../components';
import { FemaleAvatar } from '../../../images';

import styles from './Profile.module.css';

const ProfileScreen = (props) => {
  const [state, setState] = useMergedState({
    documents: [],
    documentLoading: true,
    documentError: null,

    file: null,
    fileType: null,
    filePreview: null,

    profile: null,
    profileLoading: true,
    profileError: null,

    issuedDate: new Date(),
  });

  const {
    documentLoading,
    file,
    filePreview,
    documents,
    documentError,
    fileType,
    profile,
    profileLoading,
    profileError,
    issuedDate,
  } = state;

  const {
    auth: { authToken },
  } = props;

  useEffect(
    () => () => {
      URL.revokeObjectURL(filePreview);
    },
    [filePreview]
  );

  useEffect(() => {
    getUserFromAPI();
    //eslint-disable-next-line
  }, []);

  const getUserFromAPI = async () => {
    try {
      setState({ profileLoading: true, profileError: null });
      const response = await getUser(authToken);
      setState({ profile: response, profileLoading: false });
      getDocumentsFromAPI();
    } catch (err) {
      setState({ profileLoading: false, profileError: err.message });
    }
  };

  const getDocumentsFromAPI = async () => {
    try {
      const response = await getDocuments(authToken);
      setState({ documents: [...response], documentLoading: false });
    } catch (err) {
      setState({ documentLoading: false, documentError: err.message });
    }
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setState({
        file: acceptedFiles[0],
        filePreview: URL.createObjectURL(acceptedFiles[0]),
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: 'image/jpeg',
    onDrop,
    disabled: file,
  });

  const handleTypeChange = (selectedValue) => {
    setState({ fileType: selectedValue });
  };

  const handleFileUpload = async () => {
    try {
      if (fileType) {
        const dateInUtc = getDateStringInUTC(issuedDate);
        setState({ documentLoading: true, documentError: null });
        const response = await addDocument(
          {
            type: fileType.value,
            document: state.file,
            issuedDate: dateInUtc,
          },
          authToken
        );
        setState({
          documentLoading: false,
          documents: [...response],
          file: null,
          fileType: null,
        });
      } else {
        setState({ documentError: 'Please select a document type.' });
      }
    } catch (err) {
      setState({ documentLoading: false, documentError: err.message });
    }
  };

  const handleRemoveFile = () => {
    setState({ file: null, filePreview: null });
  };

  const handleIssuedDateChange = (selectedDate) => {
    setState({ issuedDate: selectedDate });
  };

  const renderFileList = () => {
    const filesToRender = documents.map((document, index) => {
      const style =
        index === documents.length - 1 ? [styles.file__item, styles.final__item].join(' ') : styles.file__item;

      return (
        <div className={style} key={document.id}>
          <label>{document.type === documentTypes.DRIVING_LICENSE ? 'Driving License' : 'Other Document'}</label>
          <a href={getImageUrl(document.img)} target="_blank" rel="noopener noreferrer" className={styles.image__label}>
            View Image
          </a>
        </div>
      );
    });
    return filesToRender;
  };

  const renderProfileContent = () => {
    const { firstname, lastname, email, license } = profile;
    return (
      <div className={styles.main__div}>
        <div className={styles.inner__div}>
          <PageHeader text="Your Profile" />
          <div className={styles.child__div}>
            <div className={styles.image__div}>
              <img src={FemaleAvatar} alt="Profile" className={styles.profile__img} />
            </div>
            <label className={styles.div__title}>PROFILE DETAILS</label>
            <div className={styles.group__div}>
              <span className={styles.group__title}>Name</span>
              <span className={styles.group__value}>{`${firstname} ${lastname}`}</span>
            </div>
            <div className={styles.group__div}>
              <span className={styles.group__title}>Email Address</span>
              <span className={styles.group__value}>{email}</span>
            </div>
            <div className={styles.group__div}>
              <span className={styles.group__title}>License No.</span>
              <span className={styles.group__value}>{license}</span>
            </div>
          </div>
          <div className={styles.child__div}>
            <label className={styles.div__title}>YOUR DOCUMENTS</label>
            {documents.length > 0 && <div className={styles.file__list}>{renderFileList()}</div>}
            <label className={styles.div__title}>UPLOAD DOCUMENTS</label>
            {file ? (
              <div className={styles.display__div}>
                <img className={styles.image} src={filePreview} alt="Selected" />
                <div className={styles.separator__div} />
                <button className={styles.remove__btn} type="button" onClick={handleRemoveFile}>
                  <AiOutlineDelete size={25} />
                </button>
              </div>
            ) : (
              <div {...getRootProps({ className: styles.dropzone })}>
                <input {...getInputProps()} />
                <div className={styles.active__div}>
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </div>
            )}
            <label className={styles.form__label}>Document Type</label>
            <Select options={documentTypesArray} value={fileType} onChange={handleTypeChange} />
            <label className={styles.form__label}>Issued Date</label>
            <DatePicker
              selected={issuedDate}
              onChange={handleIssuedDateChange}
              className={styles.date__picker}
              maxDate={new Date()}
              dateFormat="MMMM d, yyyy"
              disabled={documentLoading}
            />
            <AppButton
              text="upload"
              loading={documentLoading || file === null}
              onClick={handleFileUpload}
              containerStyle={{ marginTop: '10px' }}
            />
            {documentError && <span className={styles.file__error}>{documentError}</span>}
          </div>
        </div>
      </div>
    );
  };

  const renderLoading = () => <Loading text="Loading Profile" />;

  const renderProfileError = () => <Glitch text={profileError} onRetry={getUserFromAPI} />;

  return profileLoading ? renderLoading() : profileError ? renderProfileError() : profile && renderProfileContent();
};

const mapStateToProps = ({ auth: { auth } }) => {
  return {
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileScreen));
