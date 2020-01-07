import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';

import { Icomoon } from '../../components';
import { useMergedState } from '../../helper/useMergedState';
import { addDocument, getUser, getDocuments } from '../../api/user';
import { documentTypes, documentTypesArray } from '../../constants/constants';
import { getImageUrl } from '../../helper/vehicleHelper';

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
    file,
    filePreview,
    documents,
    documentError,
    fileType,
    profile,
    profileLoading,
    profileError
  } = state;

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
      const {
        auth: {
          authDetails: { authToken }
        }
      } = props;
      const response = await getUser(authToken);
      setState({ profile: response, profileLoading: false });
    } catch (err) {
      setState({ profileLoading: false, profileError: err.message });
    }
  };

  const getDocumentsFromAPI = async () => {
    try {
      const {
        auth: {
          authDetails: { authToken }
        }
      } = props;
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
    const {
      auth: {
        authDetails: { authToken }
      }
    } = props;
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
    const filesToRender = documents.map(document => {
      return (
        <div className={styles.fileListItem} key={document.id}>
          <label className={styles.fileTypeLabel}>
            {document.type === documentTypes.DRIVING_LICENSE
              ? 'Driving License'
              : 'Other Document'}
          </label>
          <a
            href={getImageUrl(document.img)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.imageLabel}
          >
            View Image
          </a>
        </div>
      );
    });
    return filesToRender;
  };

  const renderProfileContent = () => {
    return (
      <div className={styles.parentDiv}>
        <div className={styles.innerDiv}>
          <div className={styles.profileInnerDiv}>
            <img
              src="https://freeiconshop.com/wp-content/uploads/edd/person-flat-128x128.png"
              alt="Profile"
              className={styles.image}
            />
            <label
              className={styles.name}
            >{`${profile.firstname} ${profile.lastname}`}</label>
            <label className={styles.email}>{profile.email}</label>
          </div>
          <div className={styles.editDiv}>
            {/* <div className={styles.leftDiv}>
              <label className={styles.divHeader}>USER PROFILE</label>
            </div> */}
            <div className={styles.rightDiv}>
              <label className={styles.divHeader}>USER DOCUMENTS</label>
              {documents.length > 0 && (
                <div className={styles.fileListDiv}>{renderFileList()}</div>
              )}
              <div {...getRootProps({ className: styles.dropzone })}>
                <input {...getInputProps()} />
                {file ? (
                  <div className={styles.displayDiv}>
                    <img
                      className={styles.image}
                      src={filePreview}
                      alt="Selected"
                    />
                    <button
                      className={styles.removeBtn}
                      type="button"
                      onClick={handleRemoveFile}
                    >
                      <Icomoon icon="cross" color="#000000" size={15} />
                    </button>
                  </div>
                ) : (
                  <div className={styles.activeDiv}>
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                )}
              </div>
              <Select
                options={documentTypesArray}
                value={fileType}
                onChange={handleTypeChange}
              />
              <button
                type="button"
                className={styles.uploadBtn}
                onClick={handleFileUpload}
                disabled={file === null}
              >
                UPLOAD
              </button>
            </div>
          </div>
          {documentError && (
            <div className={styles.errorDiv}>{documentError}</div>
          )}
        </div>
      </div>
    );
  };

  const renderLoading = () => <div>Loading</div>;

  const renderProfileError = () => <div>{profileError}</div>;

  return profileLoading
    ? renderLoading()
    : profileError
    ? renderProfileError()
    : profile && renderProfileContent();
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
);
