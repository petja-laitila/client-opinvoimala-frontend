import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/storeContext';

const FrontPage: React.FC = observer(() => {
  const {
    frontPage: { state, frontPage, fetchFrontPage },
  } = useStore();

  const { title, mainImage, subtitle, description, descriptionImage } = {
    title: frontPage?.main_title,
    mainImage: frontPage?.main_image,
    descriptionImage: frontPage?.description_image,
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
      {mainImage && <img src={mainImage.url} alt="" />}
      {subtitle && <div>{subtitle}</div>}
      {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
      {descriptionImage && <img src={descriptionImage.url} alt="" />}
    </div>
  );
});

export default FrontPage;
