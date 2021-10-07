import { SnapshotOut, types } from 'mobx-state-tree';

export const LinkModel = types.model({
  id: types.number,
  label: types.maybeNull(types.string),
  url: types.maybeNull(types.string),
  page: types.maybeNull(types.number),
});

export interface Link extends SnapshotOut<typeof LinkModel> {}
