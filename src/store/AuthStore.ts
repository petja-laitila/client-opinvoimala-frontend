import {
  Instance,
  types,
  flow,
  cast,
  SnapshotOut,
  SnapshotIn,
} from 'mobx-state-tree';
import api from '../services/api/Api';
import Storage from '../services/storage';

const States = ['IDLE' as const, 'PROCESSING' as const, 'ERROR' as const];

const UserModel = types.model({
  id: types.number,
});

export interface IUserModel extends Instance<typeof UserModel> {}
export interface User extends SnapshotOut<typeof UserModel> {}
export interface UserIn extends SnapshotIn<typeof UserModel> {}

export const AuthStore = types
  .model({
    state: types.enumeration('State', States),

    jwt: types.optional(
      types.maybeNull(types.string),
      Storage.read({ key: 'AUTH_TOKEN' })
    ),
    user: types.maybeNull(UserModel),
  })
  .views(self => ({
    get isLoggedIn() {
      return !!self.jwt?.length;
    },
  }))
  .actions(self => {
    const register = flow(function* (params: API.AuthRegister) {
      self.state = 'PROCESSING';

      const response: API.GeneralResponse<API.RES.Auth> = yield api.register(
        params
      );

      if (response.kind === 'ok') {
        self.user = cast(response.data.user);
        self.jwt = cast(response.data.jwt);
        self.state = 'IDLE';
        return true;
      } else {
        self.state = 'ERROR';
        return false;
      }
    });

    const logout = flow(function* () {
      self.state = 'PROCESSING';
      console.log('HELLO');
      self.jwt = null;
      self.user = null;
      Storage.write({ key: 'AUTH_TOKEN', value: null });
      yield api.logout();
      self.state = 'IDLE';
    });

    return {
      register,
      logout,
    };
  });

export interface IAuthStore extends Instance<typeof AuthStore> {}
