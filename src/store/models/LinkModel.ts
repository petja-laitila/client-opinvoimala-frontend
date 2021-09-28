import { SnapshotOut, types } from 'mobx-state-tree';

export const LinkModel = types.model({
  label: types.maybeNull(types.string),
  url: types.maybeNull(types.string),
});

export interface Link extends SnapshotOut<typeof LinkModel> {}
