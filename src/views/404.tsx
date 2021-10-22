import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';

interface Props {}

const NotFound404: React.FC<Props> = () => {
  const { t } = useTranslation();

  const hero = {
    title: t('view.404.title'),
    lead: t('view.404.lead'),
  };

  return <Layout hero={hero}></Layout>;
};

export default NotFound404;
