import {
  Instance,
  types,
  flow,
  cast,
  getSnapshot,
  SnapshotOut,
  SnapshotIn,
} from 'mobx-state-tree';
import api from '../services/api/Api';
import { LinkModel } from './models';

const States = [
  'NOT_FETCHED' as const,
  'FETCHING' as const,
  'FETCHED' as const,
  'ERROR' as const,
];

const NavItemModel = types.model({
  id: types.number,
  label: types.string,
  links: types.array(LinkModel),
});
export interface NavItem extends SnapshotOut<typeof NavItemModel> {}

const NavigationModel = types.model({
  items: types.array(NavItemModel),
});

export interface INavigationModel extends Instance<typeof NavigationModel> {}
export interface Navigation extends SnapshotOut<typeof NavigationModel> {}
export interface NavigationIn extends SnapshotIn<typeof NavigationModel> {}

export const NavigationStore = types
  .model({
    state: types.enumeration('State', States),
    data: types.maybe(NavigationModel),
  })
  .views(self => ({
    get navigation() {
      return self.data ? getSnapshot(self.data) : undefined;
    },
  }))
  .actions(self => {
    const fetchNavigation = flow(function* (params: API.GetNavigation) {
      self.state = 'FETCHING';

      const response: API.GeneralResponse<API.RES.GetNavigation> =
        yield api.getNavigation(params);

      if (response.kind === 'ok') {
        self.data = cast(response.data);
        self.state = 'FETCHED';
      } else {
        self.state = 'ERROR';
      }
    });

    return {
      fetchNavigation,
    };
  });

export interface INavigationStore extends Instance<typeof NavigationStore> {}
