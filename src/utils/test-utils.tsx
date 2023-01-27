import React, { ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { StoreProvider } from '../store/storeContext';
import { rootStore } from '../store/RootStore';
import { theme, ThemeProvider } from '../theme';
import '../i18n';
import { AdminStoreProvider } from '../store/admin/adminStoreContext';
import { adminRootStore } from '../store/admin/AdminRootStore';

function render(ui: ReactElement, { ...renderOptions }: any = {}) {
  const Wrapper: React.FC = ({ children }) => {
    return (
      <StoreProvider value={rootStore}>
        <AdminStoreProvider value={adminRootStore}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AdminStoreProvider>
      </StoreProvider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
