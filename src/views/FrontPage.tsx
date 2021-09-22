import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/storeContext';

const FrontPage: React.FC = observer(() => {
  const { frontPage } = useStore();

  return (
    <div>
      <h1>{frontPage.title}</h1>
      <p>{frontPage.description}</p>
    </div>
  );
});

export default FrontPage;
