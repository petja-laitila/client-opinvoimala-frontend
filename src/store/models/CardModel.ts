import { SnapshotOut, types } from 'mobx-state-tree';
import { ImageModel } from './ImageModel';
import { LinkModel } from './LinkModel';

export const CardModel = types.model({
  id: types.number,
  title: types.maybeNull(types.string),
  text: types.maybeNull(types.string),
  image: types.maybeNull(ImageModel),
  link: types.maybeNull(LinkModel),
});

export interface Card extends SnapshotOut<typeof CardModel> {}
