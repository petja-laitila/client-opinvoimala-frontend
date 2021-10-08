import BaseApi from './BaseApi';
import { ApiConfig, DEFAULT_API_CONFIG } from './config';

type Response<T> = API.GeneralResponse<T>;

export class Api extends BaseApi {
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    super(config);
  }

  /**
   * User registration
   */
  async register(params: API.AuthRegister): Promise<Response<API.RES.Auth>> {
    const response = await this.api.post(`auth/local/register`, params, {});

    if (!response.ok) return this.handleError(response);

    const successResponse = this.handleSuccess(response);
    if (successResponse.data?.jwt.length) {
      this.setToken(successResponse.data?.jwt);
    }
    return successResponse;
  }

  /**
   * Change password for the authenticated user
   */
  async changePassword(
    params: API.AuthChangePassword
  ): Promise<Response<API.RES.User>> {
    const url = 'users/change-password';
    const response = await this.api.put(url, params, this.auth());
    return this.handleResponse(response);
  }

  /**
   * Sends a link via email to reset user's password
   */
  async forgotPassword(
    params: API.AuthForgotPassword
  ): Promise<Response<API.RES.AuthForgotPassword>> {
    const url = 'auth/forgot-password';
    const response = await this.api.post(url, params, {});
    return this.handleResponse(response);
  }

  /**
   * Resets user's password
   */
  async resetPassword(
    params: API.AuthResetPassword
  ): Promise<Response<API.RES.Auth>> {
    const response = await this.api.post('auth/reset-password', params, {});
    return this.handleResponse(response);
  }

  /**
   * User login
   */
  async login(params: API.AuthLogin): Promise<Response<API.RES.Auth>> {
    const response = await this.api.post(`auth/local`, params, {});

    if (!response.ok) return this.handleError(response);

    const successResponse = this.handleSuccess(response);
    if (successResponse.data?.jwt.length) {
      this.setToken(successResponse.data?.jwt);
    }
    return successResponse;
  }

  /**
   * User logout
   */
  async logout() {
    // Currently no logout endpoint available in Strapi backend, just clear token:
    this.setToken(undefined);
  }

  /**
   * Fetch app settings (app name, logo etc.)
   */
  async getSettings(
    params: API.GetSettings
  ): Promise<Response<API.RES.GetSettings>> {
    const response = await this.api.get(`settings`, params, {});
    return this.handleResponse(response);
  }

  /**
   * Fetch main navigation
   */
  async getNavigation(
    params: API.GetNavigation
  ): Promise<Response<API.RES.GetNavigation>> {
    const response = await this.api.get(`navigation`, params, {});
    return this.handleResponse(response);
  }

  /**
   * Fetch data for the front page
   */
  async getFrontPage(
    params: API.GetFrontPage
  ): Promise<Response<API.RES.GetFrontPage>> {
    const response = await this.api.get(`front-page`, params, {});
    return this.handleResponse(response);
  }

  /**
   * Fetch data for the front page
   */
  async getContentPage({
    id,
    ...params
  }: API.GetContentPage): Promise<Response<API.RES.GetContentPage>> {
    const response = await this.api.get(`pages/${id}`, params, {});
    return this.handleResponse(response);
  }
}

export const api = new Api();

export default api;
