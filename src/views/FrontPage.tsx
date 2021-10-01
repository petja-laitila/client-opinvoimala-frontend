import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/storeContext';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { Divider, Grid } from 'semantic-ui-react';
import Watermark from '../components/Layout/Watermark';

export const FrontPage: React.FC = observer(() => {
  const {
    frontPage: { state, frontPage, fetchFrontPage },
  } = useStore();

  const { details, detailsImage, cards } = frontPage ?? {};

  const isLoading = state === 'NOT_FETCHED' || state === 'FETCHING';

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
    <Layout hero={hero} isLoading={isLoading}>
      <Divider section hidden />

      <Grid columns={4} stackable doubling centered stretched>
        {cards?.map(card => (
          <Grid.Column>
            <Card key={card.id} {...card} />
          </Grid.Column>
        ))}
      </Grid>

      <Divider section hidden />

      <Grid
        stackable
        centered
        reversed="computer tablet mobile"
        style={{ position: 'relative' }}
      >
        <Watermark right={-80} />
        <Watermark bottom={-10} left={-80} />
        <Grid.Row columns={2}>
          {details && (
            <Grid.Column>
              <div
                className="details__text-container"
                dangerouslySetInnerHTML={{ __html: details }}
              />
            </Grid.Column>
          )}
          {detailsImage && (
            <Grid.Column>
              <img src={detailsImage.url} alt="" />
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    </Layout>
  );
});
