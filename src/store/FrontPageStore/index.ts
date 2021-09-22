import { Instance, types, flow, cast, getSnapshot } from 'mobx-state-tree';

const States = [
  'NOT_FETCHED' as const,
  'FETCHING' as const,
  'FETCHED' as const,
  'ERROR' as const,
];

export const FrontPageStore = types.model({
  state: types.enumeration('State', States),

  title: 'Tämä on etusivu',
  description: 'Tämä on etusivun kuvausteksti.',
});

export interface IFrontPageStore extends Instance<typeof FrontPageStore> {}
