import React, { useEffect } from 'react';
import './i18n';
import { useStore } from './store/storeContext';
import { observer } from 'mobx-react-lite';
import { Dimmer, Loader } from 'semantic-ui-react';
import { GlobalStyle, theme, ThemeProvider } from './theme';
import AppRouter from './routes/AppRouter';

const App: React.FC = observer(() => {
  const {
    auth: { state: authState },
    settings: { state: settingsState, fetchSettings },
    navigation: { state: navigationState },
  } = useStore();

  const isFetching = (...states: string[]) => {
    const fetchingStates = states.filter(state =>
      ['NOT_FETCHED', 'FETCHING', 'PROCESSING'].includes(state)
    );
    return !!fetchingStates.length;
  };

  const appIsLoading = isFetching(settingsState, navigationState, authState);

  useEffect(() => {
    if (settingsState === 'NOT_FETCHED') {
      fetchSettings();
    }
  }, [fetchSettings, settingsState]);

  return (
    <ThemeProvider theme={theme}>
      <Dimmer inverted active={appIsLoading} style={{ position: 'fixed' }}>
        <Loader size="massive" />
      </Dimmer>
      <GlobalStyle />
      <AppRouter />
    </ThemeProvider>
  );
});

export default App;
