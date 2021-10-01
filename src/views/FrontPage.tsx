import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/storeContext';
import Layout from '../components/Layout';
import Columns from '../components/Layout/Columns';
import Card from '../components/Card';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  .details {
    &__image-container {
      margin-left: auto;
      margin-right: auto;
    }
    &__text-container {
      p {
        ${p => p.theme.font.size.md};
      }
      h4 {
        font-size: 20px;
      }
    }
  }
`;

export const FrontPage: React.FC = observer(() => {
  const {
    frontPage: { state, frontPage, fetchFrontPage },
  } = useStore();

  const { details, detailsImage, cards } = frontPage ?? {};

  const hero = {
    title: frontPage?.title,
    lead: frontPage?.lead,
    image: frontPage?.image,
    align: 'center',
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

      <DetailsContainer>
        <Columns reverseOrderOnMobile showBottomWatermark>
          {detailsImage && (
            <div className="details__image-container">
              <img src={detailsImage.url} alt="" />
            </div>
          )}
          {details && (
            <div
              className="details__text-container"
              dangerouslySetInnerHTML={{ __html: details }}
            />
          )}
        </Columns>
      </DetailsContainer>
    </Layout>
  );
});
