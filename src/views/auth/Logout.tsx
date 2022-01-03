import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useHistory } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import Layout from '../../components/Layout';
import { useResetStores, useStore } from '../../store/storeContext';
import Message from '../../components/Message';
import { Loader } from 'semantic-ui-react';

interface Props {}

export const Logout: React.FC<Props> = observer(() => {
  const history = useHistory();
  const { t } = useTranslation();

  const resetStores = useResetStores();

  const {
    settings: { settings },
    auth: { state, isLoggedIn, logout },
  } = useStore();

  const isProcessing = state === 'PROCESSING';

  useEffect(() => {
    let goHomeTimeout: NodeJS.Timeout;
    if (!isProcessing && isLoggedIn) {
      logout();
      resetStores();
    } else {
      goHomeTimeout = setTimeout(() => {
        history.push('/');
      }, 3000);
    }

    return () => {
      clearTimeout(goHomeTimeout);
    };
  }, [logout, isProcessing, isLoggedIn, history, resetStores]);

  const hero = {
    title: settings?.appName ?? t('app_name'),
  };

  const getMessage = () => {
    if (isProcessing) {
      return t('view.logout.in_progress');
    }
    if (!isLoggedIn) {
      return (
        <>
          <Trans i18nKey="view.logout.success">
            You are now logged out. Moving to <Link to="/">homepage</Link>...
          </Trans>
          <Loader active inline />
        </>
      );
    }
    return '';
  };

  return (
    <Layout hero={hero} wrapperSize="sm">
      <Message>{getMessage()}</Message>
    </Layout>
  );
});

export default Logout;
