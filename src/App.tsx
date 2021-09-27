import React from 'react';
import './i18n';
import { StoreProvider } from './store/storeContext';
import { rootStore } from './store/RootStore';
import { observer } from 'mobx-react-lite';
import FrontPage from './views/FrontPage';
import { GlobalStyle, theme, ThemeProvider } from './theme';

const App: React.FC = observer(() => {
  return (
    <StoreProvider value={rootStore}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <FrontPage />
      </ThemeProvider>
    </StoreProvider>
  );
});

export default App;
