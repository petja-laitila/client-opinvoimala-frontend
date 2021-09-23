import { SnapshotOut, types } from 'mobx-state-tree';

export const ImageModel = types.model({
  url: types.string,
});

export interface Image extends SnapshotOut<typeof ImageModel> {}
