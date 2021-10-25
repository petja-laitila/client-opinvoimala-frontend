import { createContext, useContext } from 'react';
import { RootStore } from './RootStore';

const StoreContext = createContext<RootStore | undefined>(undefined);

export const StoreProvider = StoreContext.Provider;

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Cannot use `useStore` outside of a StoreProvider');
  }
  return store;
};

export const useResetStores = () => {
  const store = useStore();
  if (!store) {
    throw new Error('Cannot use `useResetStores` outside of a StoreProvider');
  }

  const {
    contentPages: { reset: resetContentPages },
    appointments: { reset: resetAppointments },
  } = store;

  return () => {
    resetContentPages();
    resetAppointments();
  };
};
