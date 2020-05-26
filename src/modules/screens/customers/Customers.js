import React from 'react';

import styles from './Customers.module.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useMergedState } from '../../helper/useMergedState';
import { Loading, Glitch, PageHeader, AppButton } from '../../components';
import { getUsers, enableUser, disableUser } from '../../api/admin';
import { useEffect } from 'react';

const Customers = (props) => {
  const [state, setState] = useMergedState({
    loading: false,
    error: null,
    users: [],
  });
  const { loading, error, users } = state;
  const { token } = props;

  useEffect(
    () => {
      loadUsersFromApi();
    }, //eslint-disable-next-line
    []
  );

  const loadUsersFromApi = async () => {
    try {
      if (!loading) {
        setState({ loading: true, error: null });
      }
      const { users: response } = await getUsers(token);
      setState({ loading: false, users: [...response] });
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  };

  const enableOrDisableUser = async (id, isBlackListed) => {
    try {
      setState({ loading: true, error: null });
      if (isBlackListed) {
        await enableUser(id, token);
      } else {
        await disableUser(id, token);
      }
      loadUsersFromApi();
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  };

  const renderLoading = () => {
    return <Loading text="Loading Users" />;
  };

  const renderGlitch = () => {
    return <Glitch text={error} onRetry={loadUsersFromApi} />;
  };

  const renderCustomersList = () => {
    return users.map(({ firstname, lastname, email, isBlackListed, license, id }) => {
      return (
        <div className={styles.user__item} key={id}>
          <span className={styles.span__flex}>{email}</span>
          <span className={styles.span__normal}>{`${firstname} ${lastname}`}</span>
          <span className={styles.span__normal}>{license}</span>
          <span className={styles.span__normal}>{isBlackListed ? 'Yes' : 'No'}</span>
          <div className={styles.span__button}>
            <AppButton
              text={isBlackListed ? 'Whitelist' : 'Blacklist'}
              onClick={() => {
                enableOrDisableUser(id, isBlackListed);
              }}
              type="button"
            />
          </div>
        </div>
      );
    });
  };

  const renderCustomers = () => {
    return (
      <div className={styles.customers__div}>
        <PageHeader text="Customers" />
        <div className={styles.title__div}>
          <span className={styles.span__flex}>Email</span>
          <span className={styles.span__normal}>Customer Name</span>
          <span className={styles.span__normal}>License No.</span>
          <span className={styles.span__normal}>Blacklisted</span>
          <span className={styles.span__button} />
        </div>
        {renderCustomersList()}
      </div>
    );
  };

  return (
    <div className={styles.root__div}>{loading ? renderLoading() : error ? renderGlitch() : renderCustomers()}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Customers));
