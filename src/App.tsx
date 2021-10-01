import React, { useEffect } from 'react';
import './i18n';
import { useStore } from './store/storeContext';
import { observer } from 'mobx-react-lite';
import { GlobalStyle, theme, ThemeProvider } from './theme';
import AppRouter from './routes/AppRouter';

const App: React.FC = observer(() => {
  const {
    settings: { state, fetchSettings },
  } = useStore();

  useEffect(() => {
    if (state === 'NOT_FETCHED') {
      fetchSettings({});
    }
  }, [fetchSettings, state]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRouter />
    </ThemeProvider>
  );
});

export default App;
