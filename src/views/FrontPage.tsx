import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/storeContext';

const FrontPage: React.FC = observer(() => {
  const {
    frontPage: { state, frontPage, fetchFrontPage },
  } = useStore();

  const { title, subtitle, description } = {
    title: frontPage?.main_title,
    subtitle: frontPage?.subtitle,
    description: frontPage?.description,
  };

  useEffect(() => {
    if (!frontPage && state === 'NOT_FETCHED') {
      fetchFrontPage({});
    }
  }, [fetchFrontPage, frontPage, state]);

  return (
    <div>
      <h1>{title}</h1>
      {subtitle && <div>{subtitle}</div>}
      {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
    </div>
  );
});

export default FrontPage;
