import React from 'react';
import './i18n';
import { StoreProvider } from './store/storeContext';
import { rootStore } from './store/RootStore';
import { observer } from 'mobx-react-lite';
import { GlobalStyle, theme, ThemeProvider } from './theme';
import AppRouter from './routes/AppRouter';

const App: React.FC = observer(() => {
  return (
    <StoreProvider value={rootStore}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </StoreProvider>
  );
});

export default App;
