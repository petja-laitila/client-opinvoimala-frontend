import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Layout from '../components/Layout';
import { useParams } from '../routes/hooks';
import { useStore } from '../store/storeContext';
import Watermark from '../components/Layout/Watermark';

export const ContentPage = observer(() => {
  const { id: paramId } = useParams();
  const id = Number(paramId);

  const {
    contentPages: { state, getPage, fetchPage },
  } = useStore();

  const page = getPage(id);

  const isLoading = state === 'FETCHING';

  useEffect(() => {
    if (!page && !isNaN(id) && state !== 'FETCHING') fetchPage({ id });
  }, [fetchPage, id, page, state]);

  const hero = {
    title: page?.title,
    lead: page?.lead,
  };

  return (
    <Layout wrapperSize="sm" hero={hero} isLoading={isLoading}>
      <Watermark right={-80} top={-40} />
      {page?.content && (
        <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
      )}
    </Layout>
  );
});
