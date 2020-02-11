import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { AiOutlineDelete } from 'react-icons/ai';

import { useMergedState } from '../../helper/useMergedState';
import { addDocument, getUser, getDocuments } from '../../api/user';
import { documentTypes, documentTypesArray } from '../../constants/constants';
import { getImageUrl } from '../../helper/vehicleHelper';
import { AppButton } from '../../components';

import styles from './Profile.module.css';

const ProfileScreen = props => {
  const [state, setState] = useMergedState({
    documents: [],
    documentLoading: true,
    documentError: null,

    file: null,
    fileType: null,
    filePreview: null,

    profile: null,
    profileLoading: true,
    profileError: null
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
    profileError
  } = state;

  const {
    auth: { authToken }
  } = props;

  useEffect(
    () => () => {
      URL.revokeObjectURL(filePreview);
    },
    [filePreview]
  );

  useEffect(() => {
    getUserFromAPI();
    getDocumentsFromAPI();
    //eslint-disable-next-line
  }, []);

  const getUserFromAPI = async () => {
    try {
      const response = await getUser(authToken);
      setState({ profile: response, profileLoading: false });
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

  const onDrop = acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setState({
        file: acceptedFiles[0],
        filePreview: URL.createObjectURL(acceptedFiles[0])
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: 'image/jpeg',
    onDrop,
    disabled: file
  });

  const handleTypeChange = selectedValue => {
    setState({ fileType: selectedValue });
  };

  const handleFileUpload = async () => {
    try {
      if (fileType) {
        setState({ documentLoading: true, documentError: null });
        const response = await addDocument(
          {
            type: fileType.value,
            document: state.file
          },
          authToken
        );
        setState({
          documentLoading: false,
          documents: [...response],
          file: null,
          fileType: null
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
    return (
      <div className={styles.main__div}>
        <div className={styles.inner__div}>
          <div className={styles.profile__header}>
            <label className={styles.name}>{`${profile.firstname} ${profile.lastname}`}</label>
            <label className={styles.email}>{profile.email}</label>
          </div>
          <div className={styles.edit__div}>
            <label className={styles.edit__title}>USER DOCUMENTS</label>
            {documents.length > 0 && <div className={styles.file__list}>{renderFileList()}</div>}
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
            <Select options={documentTypesArray} value={fileType} onChange={handleTypeChange} />
            <AppButton
              text="upload"
              loading={documentLoading || file === null}
              onClick={handleFileUpload}
              containerStyle={{ marginTop: '10px' }}
            />
          </div>
          {documentError && <span className={styles.file__error}>{documentError}</span>}
        </div>
      </div>
    );
  };

  const renderLoading = () => <div>Loading</div>;

  const renderProfileError = () => <div>{profileError}</div>;

  return profileLoading ? renderLoading() : profileError ? renderProfileError() : profile && renderProfileContent();
};

const mapStateToProps = ({ auth: { auth } }) => {
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileScreen));
