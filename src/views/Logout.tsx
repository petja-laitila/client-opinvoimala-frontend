import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Trans, useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import { useStore } from '../store/storeContext';
import { Link } from 'react-router-dom';

interface Props {}

export const Logout: React.FC<Props> = observer(() => {
  const { t } = useTranslation();

  const {
    settings: { settings },
    auth: { state, isLoggedIn, logout },
  } = useStore();

  const isProcessing = state === 'PROCESSING';

  useEffect(() => {
    if (!isProcessing && isLoggedIn) {
      logout();
    }
  }, [logout, isProcessing, isLoggedIn]);

  const hero = {
    title: settings?.appName ?? t('app_name'),
  };

  const getMessage = () => {
    if (isProcessing) {
      return t('view.logout.in_progress');
    }
    if (!isLoggedIn) {
      return (
        <Trans i18nKey="view.logout.success">
          Logged out. Go to <Link to="/">homepage</Link>.
        </Trans>
      );
    }
    return '';
  };

  return (
    <Layout hero={hero} wrapperSize="sm">
      {getMessage()}
    </Layout>
  );
});
