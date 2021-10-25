import { SnapshotOut, types } from 'mobx-state-tree';

export const LinkModel = types.model({
  id: types.number,
  label: types.maybeNull(types.string),
  url: types.maybeNull(types.string),
  page: types.maybeNull(
    types.model({
      id: types.number,
      title: types.maybeNull(types.string),
      slug: types.maybeNull(types.string),
    })
  ),
});

export interface Link extends SnapshotOut<typeof LinkModel> {}
