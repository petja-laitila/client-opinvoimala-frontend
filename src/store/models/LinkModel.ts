import { SnapshotOut, types } from 'mobx-state-tree';

export const LinkModel = types.model({
  label: types.maybeNull(types.string),
  url: types.maybeNull(types.string),
  target_page: types.maybeNull(types.number),
});

export interface Link extends SnapshotOut<typeof LinkModel> {}
