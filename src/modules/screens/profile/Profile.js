import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';

import { Icomoon } from '../../components';
import { useMergedState } from '../../helper/useMergedState';
import { addDocument } from '../../api/user';

import styles from './Profile.module.css';

const ProfileScreen = props => {
  const [state, setState] = useMergedState({
    documents: [],
    documentLoading: true,
    documentError: null,

    file: null,
    fileType: null,
    filePreview: null
  });

  const { file, filePreview } = state;

  useEffect(
    () => () => {
      URL.revokeObjectURL(filePreview);
    },
    [filePreview]
  );

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

  const handleOnEditClick = () => {};

  const handleFileUpload = async () => {
    try {
      const response = await addDocument(
        {
          type: 'DRIVING_LICENSE',
          document: state.file
        },
        props.auth.authDetails.authToken
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFile = () => {
    setState({ file: null, filePreview: null });
  };

  return (
    <div className={styles.parentDiv}>
      <div className={styles.innerDiv}>
        <div className={styles.profileInnerDiv}>
          <img
            src="https://freeiconshop.com/wp-content/uploads/edd/person-flat-128x128.png"
            alt="Profile"
            className={styles.image}
          />
          <label className={styles.name}>Shahid Hassan</label>
          <label className={styles.email}>shaahid.xd@gmail.com</label>
          <button
            className={styles.editBtn}
            type="button"
            onClick={handleOnEditClick}
          >
            Edit Profile
          </button>
        </div>
        <div className={styles.editDiv}>
          <div className={styles.rightDiv}>
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              {file ? (
                <div className={styles.displayDiv}>
                  <img
                    className={styles.image}
                    src={filePreview}
                    alt="Selected"
                  />
                  <div className={styles.imageDetailsDiv}>
                    <label className={styles.imageLabel}>{file.name}</label>
                    <button
                      className={styles.removeBtn}
                      type="button"
                      onClick={handleRemoveFile}
                    >
                      <Icomoon icon="cross" color="#000000" size={15} />
                    </button>
                  </div>
                  {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
                </div>
              ) : (
                <div className={styles.activeDiv}>
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              )}
            </div>
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={handleFileUpload}
              disabled={file === null}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
