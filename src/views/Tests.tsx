import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import TestsList from '../components/tests/TestsList';
import { useStore } from '../store/storeContext';

export const Tests: React.FC = observer(() => {
  const { t } = useTranslation();

  const {
    tests: { categories, categoriesState, fetchCategories },
  } = useStore();

  const isBusy = [categoriesState].includes('FETCHING');

  useEffect(() => {
    if (categoriesState === 'NOT_FETCHED') fetchCategories();
  }, [categoriesState, fetchCategories]);

  const hero = {
    title: t('route.tests'),
  };

  return (
    <Layout hero={hero} isLoading={isBusy}>
      {categories?.map(({ id, label, tests }) => (
        <TestsList
          id={`category-${id}`}
          key={id}
          title={label}
          items={tests}
          showBadges={['completedByUser', 'affectsUserProfile']}
        />
      ))}
    </Layout>
  );
});

export default Tests;
