import React from 'react';
import './i18n';
import { StoreProvider } from './store/storeContext';
import { rootStore } from './store/RootStore';
import { observer } from 'mobx-react-lite';
import FrontPage from './views/FrontPage';

const App: React.FC = observer(() => {
  return (
    <StoreProvider value={rootStore}>
      <FrontPage />
    </StoreProvider>
  );
});

export default App;
