import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { useStore } from '../store/storeContext';

interface Props {}

const Unauthorized: React.FC<Props> = () => {
  const { t } = useTranslation();

  const {
    auth: { openLoginModal },
  } = useStore();

  useEffect(() => {
    openLoginModal();
  }, [openLoginModal]);

  const hero = {
    title: t('view.unauthorized.title'),
    lead: t('view.unauthorized.lead'),
  };

  return (
    <Layout hero={hero}>
      <LoadingPlaceholder.Content />
    </Layout>
  );
};

export default Unauthorized;
