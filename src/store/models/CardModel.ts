import { SnapshotOut, types } from 'mobx-state-tree';
import { LinkModel } from '.';

export const CardModel = types.model({
  id: types.number,
  title: types.maybeNull(types.string),
  text: types.maybeNull(types.string),
  link: types.maybeNull(LinkModel),
});

export interface Card extends SnapshotOut<typeof CardModel> {}
