import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Layout from '../components/Layout';
import { useParams } from '../routes/hooks';
import { useStore } from '../store/storeContext';
import Watermark from '../components/Layout/Watermark';

export const ContentPage = observer(() => {
  const { t } = useTranslation();
  const { id: paramId } = useParams();
  const pageId = Number(paramId);
  const pageIdRef = useRef<number>();

  const [fetchFailCount, setFetchFailCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string>();

  const {
    auth: { openLoginModal, isLoggedIn },
    contentPages: { state, getPage, fetchPage },
  } = useStore();

  const page = getPage(pageId);

  const isLoading = state === 'FETCHING';

  const fetchPageFromApi = useCallback(
    async (id: number) => {
      pageIdRef.current = id;
      try {
        await fetchPage({ id });
        setFetchFailCount(0);
      } catch (error: any) {
        setFetchFailCount(fetchFailCount + 1);
        if ([401, 403].includes(error?.statusCode)) {
          setErrorMsg(t('view.content_pages.unauthorized_info'));
          openLoginModal();
        }
      }
    },
    [fetchFailCount, fetchPage, openLoginModal, t]
  );

  useEffect(() => {
    if (fetchFailCount > 2) return;

    if (state === 'UNAUTHORIZED' && pageIdRef.current === pageId) {
      if (isLoggedIn) {
        fetchPageFromApi(pageId);
      }
    } else if (!page && !isNaN(pageId) && state !== 'FETCHING') {
      fetchPageFromApi(pageId);
    }
  }, [fetchFailCount, fetchPageFromApi, isLoggedIn, page, pageId, state]);

  const defaultTitle = errorMsg ? t('view.content_pages.error') : '';

  const hero = {
    title: page?.title ?? defaultTitle,
    lead: page?.lead ?? errorMsg,
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
