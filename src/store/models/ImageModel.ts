import { SnapshotOut, types } from 'mobx-state-tree';

export const ImageModel = types.model({
  id: types.number,
  url: types.string,
  alternativeText: types.maybeNull(types.string),
});

export interface Image extends SnapshotOut<typeof ImageModel> {}
