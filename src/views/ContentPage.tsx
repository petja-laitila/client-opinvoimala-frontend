import React from 'react';
import Layout from '../components/Layout';
import Columns from '../components/Layout/Columns';
import { useParams } from '../routes/hooks';

export const ContentPage = () => {
  const { id } = useParams();

  const hero = {
    title: 'Content page placeholder',
    lead: 'TODO: Fetch data from API and present it here',
  };

  return (
    <Layout wrapperSize="sm" hero={hero}>
      <Columns>
        <div>TODO: Some content here (id={id})</div>
      </Columns>
    </Layout>
  );
};
