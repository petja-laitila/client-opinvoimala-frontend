import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/storeContext';
import Layout from '../components/Layout';
import Columns from '../components/Layout/Columns';
import Card from '../components/Card';

const FrontPage: React.FC = observer(() => {
  const {
    frontPage: { state, frontPage, fetchFrontPage },
  } = useStore();

  const { description, descriptionImage, cards } = {
    descriptionImage: frontPage?.description_image,
    description: frontPage?.description,
    cards: frontPage?.cards,
  };

  const hero = {
    title: frontPage?.main_title,
    subtitle: frontPage?.subtitle,
    image: frontPage?.main_image,
  };

  useEffect(() => {
    if (!frontPage && state === 'NOT_FETCHED') {
      fetchFrontPage({});
    }
  }, [fetchFrontPage, frontPage, state]);

  return (
    <Layout hero={hero}>
      <Columns showTopWatermark={false}>
        {cards?.map(card => (
          <Card key={card.id} {...card} />
        ))}
      </Columns>

      <Columns reverseOrderOnMobile showBottomWatermark>
        {descriptionImage && (
          <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <img src={descriptionImage.url} alt="" />
          </div>
        )}
        {description && (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </Columns>
    </Layout>
  );
});

export default FrontPage;
