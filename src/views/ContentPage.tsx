import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Layout from '../components/Layout';
import Columns from '../components/Layout/Columns';
import { useParams } from '../routes/hooks';
import { useStore } from '../store/storeContext';

export const ContentPage = observer(() => {
  const { id: paramId } = useParams();
  const id = Number(paramId);

  const {
    contentPages: { state, getPage, fetchPage },
  } = useStore();

  const page = getPage(id);

  const isLoading = state === 'FETCHING';

  useEffect(() => {
    if (!page && state !== 'FETCHING') fetchPage({ id });
  }, [fetchPage, id, page, state]);

  const hero = {
    title: page?.title,
    lead: page?.lead,
  };

  return (
    <Layout wrapperSize="sm" hero={hero} isLoading={isLoading}>
      <Columns>
        {page?.content && (
          <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
        )}
      </Columns>
    </Layout>
  );
});
