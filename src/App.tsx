import React, { FC } from 'react';
import './i18n';
import { useTranslation } from 'react-i18next';

const App: FC = () => {
  const { t } = useTranslation();

  return <div className="App">{t('app_name')}</div>;
};

export default App;
