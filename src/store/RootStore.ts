import { Instance, onSnapshot, SnapshotOut, types } from 'mobx-state-tree';
// import STORAGE from '../services/storage';
import { FrontPageStore } from './FrontPageStore';
import { SettingsStore } from './SettingsStore';
import { NavigationStore } from './NavigationStore';
import { ContentPageStore } from './ContentPageStore';

const RootStoreModel = types.model({
  settings: types.optional(SettingsStore, {
    state: 'NOT_FETCHED',
  }),
  navigation: types.optional(NavigationStore, {
    state: 'NOT_FETCHED',
  }),
  frontPage: types.optional(FrontPageStore, {
    state: 'NOT_FETCHED',
  }),
  contentPages: types.optional(ContentPageStore, {
    state: 'IDLE',
  }),
});

export interface RootStore extends Instance<typeof RootStoreModel> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

// const storageState = STORAGE.read({ key: 'ROOT_STATE' });

// Get initial state from local storage (or initialize empty state)
// export const rootStore = RootStoreModel.create(RootStoreModel.is(storageState) ? storageState : {});
export const rootStore = RootStoreModel.create({});

// Update state in local storage on every snapshot
onSnapshot(rootStore, snapshot => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Snapshot:', snapshot);
  }
  // STORAGE.write({ key: 'ROOT_STATE', value: snapshot });
});
