import React, { useEffect } from 'react';
import './i18n';
import { useStore } from './store/storeContext';
import { observer } from 'mobx-react-lite';
import { Dimmer, Loader } from 'semantic-ui-react';
import { GlobalStyle, theme, ThemeProvider } from './theme';
import AppRouter from './routes/AppRouter';

const App: React.FC = observer(() => {
  const {
    settings: { state: settingsState, fetchSettings },
    navigation: { state: navigationState },
  } = useStore();

  const isFetching = (state: string) => {
    return state === 'NOT_FETCHED' || state === 'FETCHING';
  };

  const appIsLoading = isFetching(settingsState) || isFetching(navigationState);

  useEffect(() => {
    if (settingsState === 'NOT_FETCHED') {
      fetchSettings({});
    }
  }, [fetchSettings, settingsState]);

  return (
    <ThemeProvider theme={theme}>
      <Dimmer inverted active={appIsLoading}>
        <Loader size="massive" />
      </Dimmer>
      <GlobalStyle />
      <AppRouter />
    </ThemeProvider>
  );
});

export default App;
