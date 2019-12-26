import React from 'react';
import { connect } from 'react-redux';

import { useMergedState } from '../../helper/useMergedState';
import { addDocument } from '../../api/user';

import styles from './Profile.module.css';

const ProfileScreen = props => {
  const [state, setState] = useMergedState({
    documentList: [],
    documentLoading: true,
    documentError: null,
    selectedDocument: null
  });
  const handleOnEditClick = () => {};
  const handleFileChange = ({ target: { files } }) => {
    setState({ selectedDocument: files[0] });
  };
  const handleFileUpload = async () => {
    try {
      const response = await addDocument(
        {
          type: 'DRIVING_LICENSE',
          document: state.selectedDocument
        },
        props.auth.authDetails.authToken
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
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
            <input type="file" name="document" onChange={handleFileChange} />
            <button type="button" onClick={handleFileUpload}>
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
